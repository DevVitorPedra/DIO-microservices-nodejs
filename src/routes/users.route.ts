import { Router,Request,Response,NextFunction } from "express";
import {StatusCodes} from 'http-status-codes'
import userRepository from "../repositories/user.repository";


const usersRoute = Router();
usersRoute.get('/users', async(req:Request,res:Response,next:NextFunction)=>{
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
})
usersRoute.get('/users/:uuid',async (req:Request<{uuid:string}>,res:Response,next:NextFunction)=>{
 try {
    const {uuid} = req.params
    const user = await userRepository.findById(uuid)
    res.status(StatusCodes.OK).send(user)
 } catch (error) {
     next(error)
 }
})

usersRoute.post('/users',async (req:Request,res:Response,next:NextFunction)=>{
   try {
    const newUser = req.body
    const uuid = await userRepository.createUser(newUser)
    res.status(StatusCodes.CREATED).send({userID:uuid})
   } catch (error) {
       next(error)
   }
})

usersRoute.put('/users/:uuid',async (req:Request<{uuid:string}>,res:Response,next:NextFunction)=>{
      try {
        const {uuid} = req.params
        const modifiedUser = req.body
        modifiedUser.uuid = uuid
        await userRepository.updateUser(modifiedUser)
        res.status(StatusCodes.OK).send({message:'success'})
      } catch (error) {
          next(error)
      }
})
usersRoute.delete('/users/:uuid',async(req:Request<{uuid:string}>,res:Response,next:NextFunction)=>{
   try {
    const { uuid } = req.params
    await userRepository.deleteUser(uuid)
    res.sendStatus(StatusCodes.OK)
   } catch (error) {
       next(error)
   }
})
export default usersRoute