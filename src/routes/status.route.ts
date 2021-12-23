import { Router,Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const statusRoute = Router()

statusRoute.get('/status',(req:Request,res:Response,next:NextFunction)=>{
    res.status(StatusCodes.OK).send({tudo:"OK"})
})

export default statusRoute