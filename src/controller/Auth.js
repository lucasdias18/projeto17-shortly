import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import db from '../config/database.js'

export async function signUp(req, res) {

    const { email, name, password, confirmPassword } = req.body

    const passwordHash = bcrypt.hashSync(password, 10);


    try {

        const existsUser = await db.query(`SELECT * FROM customers WHERE email = $1`, [email])

        if (existsUser.rowCount > 0) return res.status(409).send('Usuário já cadastrado!')

        // await db.collection("users").insertOne({ email, name, password: passwordHash, wishlist: [] })

        const newClient = await db.query(
            `INSERT INTO users (email, name, "passwordHash")
            VALUES ($1, $2, $3);`
            , [email, name, cpf, passwordHash])

        res.status(201).send("Usuário cadastrado com sucesso!")

    }
    catch {
        res.sendStatus(500)
    }

}

export async function login(req, res) {

    const {email, password} = req.body

    try {
        // console.log('teste')
        const existsUser = await db.query(`SELECT * FROM customers WHERE email = $1`, [email])
        // console.log(existsUser)

        if(existsUser.rowCount === 0 || bcrypt.compareSync(password, existsUser.password) === false) return res.status(401).send("Usuário ou senha incorretos!")
        // console.log('teste')

        const token = uuid();
        // console.log(token)

        await db.query(
            `INSERT INTO sessions (user_id, token)
            VALUES ($1, $2);`
            , [existsUser.id, token]) 
        
            // const newClient = await db.query(
            //     `INSERT INTO customers (email, name, passwordHash)
            //     VALUES ($1, $2, $3);`
            //     , [email, name, cpf, passwordHash])

        // code to create cart collection for user
        // const checkCart = await db.collection("carts").findOne({ _id: existsUser._id });
        // if (!checkCart) {
        //     const userCart = {
        //     _id: existsUser._id,
        //     name: existsUser.name,
        //     cart : [],
        //     };
        //     await db.collection("carts").insertOne(userCart);
        // };

        res.send(token)

    }
    catch {
        res.status(500).send('deu zica no servidor')
    }
}