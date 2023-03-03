// import { getCustomers, putCustomers, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { getUser, login, signUp } from '../controller/Auth.js'
import { validateSchema } from "../middleware/validateSchema.js"
import { userSchema } from '../schema/AuthSchema.js'

const authRouter = Router()

authRouter.post("/signup", validateSchema(userSchema), signUp)
authRouter.post("/signin", login)
authRouter.get("/users/me", getUser)

// validateSchema(validateSchema)

export default authRouter