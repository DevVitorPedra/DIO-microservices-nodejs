import express from 'express'
import dotenv from "dotenv"
import usersRoute from './routes/users.route'
import statusRoute from './routes/status.route'
import errorHandler from './middlewares/error.handler.middleware'
dotenv.config()
const app = express()
app.use(express.json())
app.use(usersRoute)
app.use(statusRoute)
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log("rodando na ",process.env.PORT)
})