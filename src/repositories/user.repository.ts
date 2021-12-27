

import  DatabaseError  from "../models/errors/database.error.models"
import db from "../db"
import User from "../models/user.model"

class UserRepository{
   async  findAllUsers (): Promise<User[]> {
    try {
        const query= `SELECT uuid,username FROM application_user`
        const {rows} = await db.query<User>(query)
        return rows || []
    } catch (error) {
      throw new DatabaseError("erro na consulta ao banco de dados",error)
    }
    }
    async findById(uuid:string): Promise<User>{
       try {
        const query = `SELECT uuid,username FROM application_user WHERE uuid=$1`
        const values = [uuid]
        const {rows} = await db.query<User>(query,values);
        return rows[0]
       } catch (error) {
        throw new DatabaseError("erro na consulta por ID", error)
       }
    }
    async createUser(user:User): Promise<string> {
     try {
        const query = `INSERT INTO application_user( username,password) VALUES ($1, crypt($2, $3)) RETURNING uuid`;
        const values = [user.username,user.password,process.env.MY_SALT]
        const {rows} = await db.query<{uuid:string}>(query,values);
        const [newUser] = rows
        return newUser.uuid
     } catch (error) {
         throw error
     }
    }
    async updateUser(user:User): Promise<void>{
      try {
        const query = `UPDATE application_user 
        SET
            username   =$1, 
            password  = crypt($2, $4) 
        WHERE uuid = $3`;
        const values = [user.username, user.password, user.uuid, process.env.MY_SALT]
        await db.query(query,values);
      } catch (error) {
          throw error
      }

    }
    async deleteUser(uuid:string): Promise<void>{
     try {
        const query = `DELETE FROM application_user WHERE uuid = $1`
        const values = [uuid]
        await db.query(query,values);
     } catch (error) {
         throw error
     }
    }
}

export default new UserRepository()