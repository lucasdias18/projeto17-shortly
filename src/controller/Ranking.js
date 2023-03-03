import db from '../config/database.js'

export async function getRanking(req, res) {
    

    try{
        const users = await db.query(`SELECT id, name, links_count, views_count FROM users ORDER BY views_count DESC LIMIT 10`)
        console.log(users.rows)

        res.send('Ok!')
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}