import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";


export class AuthController {
    protected authService = new AuthService();
    async signup(req: Request, res: Response) {
        try {
            const body = req.body;
            const userToSave = await this.authService.signup(body);
            return res.status(201).send(userToSave);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Auth's Service : Internal Service Errror !!!")
        }
    }
    async login(req: Request, res: Response) {
        try {
            const body = req.body;
            const tokenToGet = await this.authService.login(body);
            if (tokenToGet === 0) {
                return res.status(200).send("No User Found !!!");
            } else if (tokenToGet === 1) {
                return res.status(200).send("Invalid Credentials !!!")
            } else {
                return res.status(200).send({ token: tokenToGet });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Auth's Service : Internal Service Errror !!!")
        }
    }
    async resetPass(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const data = req.body;
            const resultResult = await this.authService.resetPass(email, data);
            if (resultResult.modifiedCount) {
                return res.status(200).send("Password Reset Sucessfully !!!")
            } else {
                return res.status(200).send("Password Not Reseted !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Auth's Service : Internal Service Errror !!!")
        }
    }
    async forgetPass(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const userToFind = await this.authService.forgetPass(email);
            if (userToFind === 0) {
                return res.status(200).send("Invalid Email !!!")
            } else {
                return res.status(200).send(userToFind)
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Auth's Service : Internal Service Errror !!!")
        }
    }
    async getUserFromId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.authService.getSingleUserFromId(id);
            return res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async decodeUsers(req: Request, res: Response){
       try {
            const token = req.params.token;
            const decodedVal = await this.authService.decodetoken(token);
            const data = await this.authService.getSingleUserFromId(decodedVal);
            return res.status(200).send(data);
       } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
       }
    }
}