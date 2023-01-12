import { Request, Response } from "express";
import AuthService  from "../services/auth.service";
import axios from "axios";
import {signInUserController} from "../helpers/signinUser";

export default class AuthController {
    protected authService = new AuthService();
    async getOtherDetails(authId:string){
        try {
            const response = await axios.get(process.env.GET_USER_URI as string + authId)
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async listUsers(req:Request,res:Response){
        try {
            const users = await this.authService.listUsers();
            return res.status(200).send(users);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!");
        }
    }
    async signup(req: Request, res: Response) {
        try {
            const body = req.body;
            const userToSave = await this.authService.signup(body);
            if(userToSave===0){
                return res.status(201).send("User Already Exist !!!");
            }else{
                return res.status(201).send(userToSave);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Auth's Service : Internal Service Errror !!!")
        }
    }
    async login(req: Request, res: Response) {
        try {
            const email = req.body.email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                const value = await this.authService.loginUserByEmail(req.body);
                const data = signInUserController(res, value);
                return data;
            } else {
                const value = await this.authService.loginUserByUserName(req.body);
                const data = signInUserController(res, value);
                return data;
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
            const userNext = await this.getOtherDetails(id);
            return res.status(200).send({auth:user,user:userNext});
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async decodeUsers(req: Request, res: Response){
       try {
            const token = req.params.token;
            const decodedVal = await this.authService.decodetoken(token);
            const data = await this.authService.getSingleUserFromId(decodedVal as string);
            return res.status(200).send(data);
       } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
       }
    }
}