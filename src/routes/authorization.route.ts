import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken'
import basicAuthMiddleware from "../middlewares/basic-authentication.middleware";
const authorizationRoute = Router()


//criando seu token com JWT

authorizationRoute.post('/token',basicAuthMiddleware,async (req:Request,res:Response,next:NextFunction)=>{
     try {
        const user = req.user
        if(!user){
            throw new ForbiddenError("Usuário não informado")
        }
        const JWTPayload = {userName:user.username}
        const JWTOptions = {subject:user?.uuid}
        const JWTSecretKey ='my_key'
        const jwt = JWT.sign(JWTPayload,JWTSecretKey ,JWTOptions)

        res.status(StatusCodes.OK).json({token:jwt})
     } catch (error) {
         next(error)
     }
})


export default authorizationRoute