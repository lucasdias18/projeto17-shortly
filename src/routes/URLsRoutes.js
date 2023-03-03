import { Router } from 'express'
// import { getGames, postGame } from '../controller/Game.js'
import { deleteURL, getUrlId, openUrl, postURL } from '../controller/URLs.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { urlSchema } from '../schema/urlSchema.js'
// import { gameSchema } from '../schema/GameSchema.js'

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchema(urlSchema), postURL)
urlRouter.get("/urls/:id", getUrlId)
urlRouter.get("/urls/open/:shortUrl", openUrl)
urlRouter.delete("/urls/:id", deleteURL)

// , validateSchema(urlSchema)

export default urlRouter