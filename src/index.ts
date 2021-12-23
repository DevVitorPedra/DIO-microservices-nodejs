import express, {Request,Response,NextFunction} from 'express'
import dotenv from "dotenv"
dotenv.config()
const app = express()


app.get('/status',(req:Request,res:Response,next:NextFunction)=>{
            res.status(200).send({fuz:"ro dar ohhhhhh"})
})


app.listen(process.env.PORT,()=>{
    console.log("rodando na ",process.env.PORT)
})