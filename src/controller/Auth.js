import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import db from '../config/database.js'

export async function signUp(req, res) {

    const { email, name, password, confirmPassword } = req.body

    const passwordHash = bcrypt.hashSync(password, 10);


    try {

        const existsUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

        if (existsUser.rowCount > 0) return res.status(409).send('Usuário já cadastrado!')
        console.log('teste')

        const newClient = await db.query(
            `INSERT INTO users (email, name, passwordHash)
            VALUES ($1, $2, $3);`
            , [email, name, passwordHash])

        res.status(201).send("Usuário cadastrado com sucesso!")

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}

export async function login(req, res) {

    const {email, password} = req.body

    try {

        const existsUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
        // console.log(existsUser.rows[0].passwordhash)

        if(existsUser.rowCount === 0 || bcrypt.compareSync(password, existsUser.rows[0].passwordhash) === false)
        return res.status(401).send("Usuário ou senha incorretos!")

        const token = uuid();
        // console.log(token)

        await db.query(
            `INSERT INTO sessions (user_id, token)
            VALUES ($1, $2);`
            , [existsUser.rows[0].id, token]) 
        

        res.send({ token })

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}