import db from '../config/database.js'

export async function getRanking(req, res) {
    

    try{
        const users = await db.query(`SELECT id, name, links_count AS "linksCount", views_count AS "visitCount" FROM users ORDER BY views_count DESC LIMIT 10`)

        res.send(users.rows)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}