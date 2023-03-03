// import { getCustomers, putCustomers, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { login, signUp } from '../controller/Auth.js'
import { validateSchema } from "../middleware/validateSchema.js"
import { userSchema } from '../schema/AuthSchema.js'

const authRouter = Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", login)
// authRouter.put("/customers/:id", validateSchema(userSchema), putCustomers)

// validateSchema(validateSchema)

export default authRouter