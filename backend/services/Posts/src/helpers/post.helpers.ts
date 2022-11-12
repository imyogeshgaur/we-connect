import jsonwebtoken from "jsonwebtoken"
import axios from "axios"
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({path:path.resolve("./src/env/post.env")});

export class Posthelpers{
    async decodeUsers(token:string){
        const decodedVal = jsonwebtoken.decode(token, {complete: true})
        const res = await axios.get(process.env.USER_FOR_POST as string + decodedVal?.payload)
        const data = await res.data;
        return data
    }
}