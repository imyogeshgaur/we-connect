import mongoose from "mongoose";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({path:path.resolve("./src/env/auth.env")});

export const createConnection = async()=>{
    try {
        await mongoose.connect(process.env.DBURI as string);
        console.log("Authentication Service : Connected Sucessfully !!!");
    } catch (error) {
        console.log(error);
    }
}