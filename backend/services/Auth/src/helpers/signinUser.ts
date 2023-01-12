import { Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({ path: path.resolve("./src/env/auth.env") });

const signInUserService = async (userData:any, password:string) => {
    try {
        if (userData) {
            const match = await bcrypt.compare(password, userData.password);
            if (match) {
                const token = jsonwebtoken.sign({ userId: userData._id }, process.env.SECRET as string)
                return token;
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    } catch (error) {
        console.log("Sign In Service's Helper  Error : ", error)
    }
}

const signInUserController = (res:Response,tokenToGet:any)=>{
    if (tokenToGet === 0) {
        return res.status(200).send("No User Found !!!");
    } else if (tokenToGet === 1) {
        return res.status(200).send("Invalid Credentials !!!")
    } else {
        return res.status(200).send({ token: tokenToGet });
    }
}

export {signInUserController,signInUserService};