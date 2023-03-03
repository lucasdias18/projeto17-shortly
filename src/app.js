import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js"
import urlRouter from "./routes/URLsRoutes.js";
import rankingRouter from "./routes/RankingRoutes.js";


const app = express()

app.use(cors())

app.use(express.json())

app.use([authRouter])
app.use([urlRouter])
app.use([rankingRouter])

const PORT = 5000

app.listen(PORT, () => console.log("subiu!!"))