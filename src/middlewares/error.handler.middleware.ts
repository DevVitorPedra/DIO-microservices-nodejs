import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error.models";

function errorHandler(error:any,req:Request,res:Response,next:NextFunction){
    if(error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST)
    }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)


}

export default errorHandler