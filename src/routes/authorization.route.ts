import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";
const authorizationRoute = Router()


authorizationRoute.post('/token',async (req:Request,res:Response,next:NextFunction)=>{
     try {
        const authorizationHeader= req.headers['authorization']
        if(!authorizationHeader){
            throw new ForbiddenError("credenciais inválidas")
        }
       const [authenticationType, token] = authorizationHeader.split(' ')
       if(authenticationType!=='Basic' || !token ){
           throw new ForbiddenError("Tipo de Autenticação inválido")
       }
        const tokenContent =  Buffer.from(token,'base64').toString('utf-8')

        const [username,password] = tokenContent.split(':')
        if(!username || !password){
            throw new ForbiddenError("Credenciais inválidas")
        }
        const user = await userRepository.findUserByUsernameAndPassword(username,password)
     } catch (error) {
         next(error)
     }
})


export default authorizationRoute