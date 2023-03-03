import { Router } from 'express'
// import { finishRental, getRentals, postRental } from "../controller/Rentals.js"
import { validateSchema } from '../middleware/validateSchema.js'
// import { rentalSchema } from '../schema/RentalSchema.js'

const rankingRouter = Router()

// rankingRouter.get("/ranking", getRanking)
// rankingRouter.get("/rentals", getRentals)
// rankingRouter.post("/rentals/:id/return", finishRental)
// rankingRouter.delete("/rentals/:id", login)

export default rankingRouter