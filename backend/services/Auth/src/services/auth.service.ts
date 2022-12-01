import Auth from "../model/auth.entity";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({ path: path.resolve("./src/env/auth.env") });

export default class AuthService {
    async listUsers() {
        try {
            const users = await Auth.find({}, { password: 0, __v: 0 });
            return users;
        } catch (error) {
            console.log(error)
        }
    }
    async signup(body: any) {
        try {
            const { userName, email, password } = body;
            const newPass = await bcrypt.hash(password, 12);
            const userToSave = new Auth({ userName, email, password: newPass });
            const newUser = await userToSave.save();
            return newUser
        } catch (error) {
            console.log(error)
        }
    }

    async login(body: any) {
        try {
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
        } catch (error) {
            console.log(error)
        }
    }

    async resetPass(email: string, data: any) {
        try {
            const user = await Auth.findOne({ email })
            if (user) {
                const newPass = await bcrypt.hash(data.password, 12);
                const resetResult = await user.updateOne({ password: newPass })
                return resetResult
            }
        } catch (error) {
            console.log(error)
        }
    }

    async forgetPass(email: string) {
        try {
            const user = await Auth.findOne({ email });
            if (user) {
                return user;
            } else {
                return 0
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getSingleUserFromId(id: string) {
        try {
            const user = await Auth.findOne({ _id: id }, { password: 0, __v: 0 })
            return user;
        } catch (error) {
            console.log(error)
        }
    }
    async decodetoken(token: any) {
        try {
            const decodedVal = jsonwebtoken.decode(token, { complete: true })
            return decodedVal?.payload as string;
        } catch (error) {
            console.log(error)
        }
    }
}