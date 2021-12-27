import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../models/errors/forbidden.error.models";
import JWT from 'jsonwebtoken'
import basicAuthMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthMiddleware from "../middlewares/jwt-atuhentication.middleware";
const authorizationRoute = Router()


//criando seu token com JWT
authorizationRoute.post('/token/validate', jwtAuthMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK)
})
authorizationRoute.post('/token', basicAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            throw new ForbiddenError("Usuário não informado")
        }
        const JWTPayload = { userName: user.username }
        const JWTOptions = { subject: user?.uuid }
        const JWTSecretKey = 'my_secret_key'
        const jwt = JWT.sign(JWTPayload, JWTSecretKey, JWTOptions)

        res.status(StatusCodes.OK).json({ token: jwt })
    } catch (error) {
        next(error)
    }
})


export default authorizationRoute