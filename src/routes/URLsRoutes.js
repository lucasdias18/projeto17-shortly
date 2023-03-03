import { Router } from 'express'
// import { getGames, postGame } from '../controller/Game.js'
import { getUrlId, openUrl, postURL } from '../controller/URLs.js'
import { validateSchema } from '../middleware/validateSchema.js'
// import { gameSchema } from '../schema/GameSchema.js'

const urlRouter = Router()

urlRouter.post("//urls/shorten", postURL)
urlRouter.get("/urls/:id", getUrlId)
urlRouter.get("/urls/open/:shortUrl", openUrl)

// , validateSchema(urlSchema)

export default urlRouter