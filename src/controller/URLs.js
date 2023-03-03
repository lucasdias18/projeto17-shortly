import db from '../config/database.js'
import { nanoid } from 'nanoid'

export async function postURL(req, res) {

    const url = req.body
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')


    try {

        const findSession = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

        if (findSession.rowCount === 0) return res.status(401).send('Faça o login')

        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [findSession.rows[0].user_id])

        const shortUrl = await nanoid()

        const newURL = await db.query(
            `INSERT INTO newurls (user_id, shortUrl, url)
            VALUES ($1, $2, $3);`
            , [user.rows[0].id, shortUrl, url])

        const linkCount = Number(user.rows[0].links_count) + 1
        console.log(linkCount)

        await db.query(`UPDATE users SET links_count = $1 WHERE id = $2`, [linkCount, user.rows[0].id])

        
        const id = await db.query(`SELECT id FROM newurls WHERE url = $1`, [url])
        // console.log(id.rows)


        res.status(201).send({ ...id.rows[0], shortUrl })

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getUrlId(req, res) {

    const { id } = req.params

    try {
        if (!id) return res.status(400).send('È necessário informar um id.')

        const findUrl = await db.query(`SELECT id, shortUrl, url FROM newurls WHERE id = $1`, [id])

        if (findUrl.rowCount === 0) return res.sendStatus(404)

        res.send(findUrl.rows)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export async function openUrl(req, res) {

    const { shortUrl } = req.params

    try {
        if (!shortUrl) return res.status(400).send('È necessário informar um identificador.')

        const findUrl = await db.query(`SELECT * FROM newurls WHERE shortUrl = $1`, [shortUrl])

        if (findUrl.rowCount === 0) return res.sendStatus(404)
        // console.log(findUrl.rows[0].views)

        const newView = Number(findUrl.rows[0].views) + 1
        // console.log(newView)

        await db.query(`UPDATE newurls SET views=$1 WHERE id = $2`, [newView, findUrl.rows[0].id])

        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [findUrl.rows[0].user_id])

        const visitCount = Number(user.rows[0].views_count) + 1
        console.log(visitCount)

        await db.query(`UPDATE users SET views_count = $1 WHERE id = $2`, [visitCount, user.rows[0].id])

        res.redirect(302, findUrl.rows[0].url)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteURL(req, res) {

    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')


    try {

        const findSession = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

        if (findSession.rowCount === 0) return res.status(401).send('Faça o login')

        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [findSession.rows[0].user_id])

        const shortUrl = await db.query(`SELECT * FROM newurls WHERE id = $1`, [id])

        if (shortUrl.rowCount === 0) return res.sendStatus(404)

        // console.log(user.rows[0].id)
        // console.log(shortUrl.rows)

        if (user.rows[0].id !== shortUrl.rows[0].user_id) return res.sendStatus(401)

        const deleteURL = await db.query(`DELETE FROM newurls WHERE id = $1`, [id])


        res.status(204).send('url deletada!')

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}
