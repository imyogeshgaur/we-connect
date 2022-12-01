import mongoose from "mongoose";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({path:path.resolve("./src/env/user.env")});

const createConnection = async()=>{
    try {
        await mongoose.connect(process.env.DBURI as string);
        console.log("User Service Database : Connected Sucessfully !!!");
    } catch (error) {
        console.log(error);
    }
}

export default createConnection;