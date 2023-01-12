import Auth from "../model/auth.entity";
import bcrypt from "bcrypt";
import { signInUserService } from "../helpers/signinUser";
import decodeUser from "../helpers/decodeUser";


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
            const userByUserName = await Auth.findOne({ userName });
            const userByEmail = await Auth.findOne({ email });
            if (userByEmail || userByUserName) {
                return 0;
            } else {
                const newPass = await bcrypt.hash(password, 12);
                const userToSave = new Auth({ userName, email, password: newPass });
                const newUser = await userToSave.save();
                return newUser  
            }

        } catch (error) {
            console.log(error)
        }
    }

    async loginUserByEmail(body: any) {
        try {
            const { email, password } = body;
            const user = await Auth.findOne({ email });
            if (user !== null) {
                if (email.toLowerCase() == user.email.toLowerCase()) {
                    const value = await signInUserService(user, password);
                    return value;
                } else {
                    return 0;
                }
            } else {
                return 0
            }
        } catch (error) {
            console.log(error)
        }
    }

    async loginUserByUserName(body: any) {
        try {
            const { email, password } = body;
            const user = await Auth.findOne({ userName:email });
            if (user) {
                if (user !== null) {
                    if (email.toLowerCase() == user.userName.toLowerCase()) {
                        const value = await signInUserService(user, password);
                        return value;
                    } else {
                        return 0;
                    }
                } else {
                    return 0
                }
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
            const decodedVal = decodeUser(token)
            return decodedVal;
        } catch (error) {
            console.log(error)
        }
    }
}