import db from '../config/database.js'
import { nanoid } from 'nanoid'

export async function postURL(req, res) {

    const url = req.body
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')


    try {

        const findSession = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

        if (findSession.rowCount === 0) return res.status(401).send('Faça o login')

        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [findSession.user_id])

        shortUrl = await nanoid()

        const newURL = await db.query(
            `INSERT INTO newurls (user_id, "shortUrl", url)
            VALUES ($1, $2, $3);`
            , [user.id, shortUrl, url])

        const viewUrl = await db.query(
            `INSERT INTO viewurls (url_id, views)
            VALUES ($1);`
            , [newURL.id])

        res.status(201).send({ id, shortUrl })

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getUrlId(req, res) {

    const { id } = req.params

    try {
        if (!id) return res.status(400).send('È necessário informar um id.')

        const findUrl = await db.query(`SELECT * FROM newurls WHERE id = $1`, [id])

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

        const findUrl = await db.query(`SELECT * FROM newurls WHERE "shortUrl" = $1`, [shortUrl])

        if (findUrl.rowCount === 0) return res.sendStatus(404)

        const newView = findUrl.views + 1

        await db.query(`UPDATE  newurls SET views=$1 WHERE id = $2`, [newView, findUrl.id])

        // const stockGame = await db.query(
        //     `UPDATE games
        //      SET "stockTotal" = $1
        //      WHERE id = $2;`, [quantityGame, gameId]
        // )

        res.redirect([302], findUrl.url)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
