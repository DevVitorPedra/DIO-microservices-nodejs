import express from 'express'
import dotenv from "dotenv"
import usersRoute from './routes/users.route'
import statusRoute from './routes/status.route'
import errorHandler from './middlewares/error.handler.middleware'
import authorizationRoute from './routes/authorization.route'
import jwtAuthMiddleware from './middlewares/jwt-atuhentication.middleware'
dotenv.config()
const app = express()
app.use(express.json())

//application routes
app.use(statusRoute)
app.use(authorizationRoute)
app.use(jwtAuthMiddleware)
app.use( usersRoute)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log("rodando na ", process.env.PORT)
})