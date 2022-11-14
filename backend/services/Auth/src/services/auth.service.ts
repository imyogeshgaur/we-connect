import Auth from "../model/auth.entity";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({ path: path.resolve("./src/env/auth.env") });

export class AuthService {
    async signup(body: any) {
        const { userName, email, password } = body;
        const newPass = await bcrypt.hash(password, 12);
        const userToSave = new Auth({ userName, email, password: newPass });
        const newUser = await userToSave.save();
        return newUser
    }

    async login(body: any) {
        const { email, password } = body;
        const user = await Auth.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jsonwebtoken.sign(user.id, process.env.SECRET as string);
                return token
            } else {
                return 1
            }
        } else {
            return 0
        }
    }

    async resetPass(email: string, data: any) {
        const user = await Auth.findOne({ email })
        if (user) {
            const newPass = await bcrypt.hash(data.password, 12);
            const resetResult = await user.updateOne({ password: newPass })
            return resetResult
        }
    }

    async forgetPass(email: string) {
        const user = await Auth.findOne({ email });
        if (user) {
            return user;
        } else {
            return 0
        }
    }
    async getSingleUserFromId(id:string){
        const user = await Auth.findOne({_id:id},{password:0,__v:0})
        return user;
    }
    async decodetoken(token:any){
        const decodedVal = jsonwebtoken.decode(token, {complete: true})
        return decodedVal?.payload as string;
    }
}