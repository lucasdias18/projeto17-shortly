import { Router } from 'express'
import { getRanking } from '../controller/Ranking.js'
import { validateSchema } from '../middleware/validateSchema.js'


const rankingRouter = Router()

rankingRouter.get("/ranking", getRanking)


export default rankingRouter