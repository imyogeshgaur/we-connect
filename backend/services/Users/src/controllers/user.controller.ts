import { Request, Response } from "express";
import { UsersService } from "../services/user.service";
import axios from "axios";

export class UserController {
    protected userService = new UsersService();

    async getAllAuthUsers(){
        try {
            const response = await axios.get(process.env.GET_AUTH_URI as string)
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            const authUsers = await this.getAllAuthUsers();
            const finalArray = Array();
            if (users.length != 0) {
                for (let i = 0; i < users.length; i++) {
                    finalArray.push({user:users[i],auth:authUsers[i]})
                }
                return res.status(200).send(finalArray);
            } else {
                return res.status(200).send("No User Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async getSingleUser(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const user = await this.userService.getSingleUser(email);
            if (user) {
                return res.status(200).send(user);
             } else {
                return res.status(200).send("No User Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async createUser(req: Request, res: Response) {
        try {
            const file = process.env.USER_PROFILE_PREFIX as string + req.file?.filename;
            const userToCreate = await this.userService.createUser(file,req.body);
            return res.status(200).send(userToCreate);
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            let data = req.body;
            const file = process.env.USER_PROFILE_PREFIX as string + req.file?.filename;
            data.image = file
            const actData = {data,image:file}
            const updateResult = await this.userService.updateUser(id, actData);
            if (updateResult.modifiedCount) {
                return res.status(200).send("User Updated !!!")
            } else {
                return res.status(200).send("No Match Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const deleteResult = await this.userService.deleteUser(email);
            if (deleteResult.deletedCount) {
                return res.status(200).send("Deleted Sucessfully !!!")
            } else {
                return res.status(200).send("No Match Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async getUserFromId(req: Request, res: Response) {
        try {
            const id = req.params.authId;
            const user = await this.userService.getSingleUserFromId(id);
            return res.status(200).send(user)
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }

    //Friend Entity Controller 
    async requestToFriend(req: Request, res: Response){
        try {
            const senderId = req.params.id;
            const reciverId = req.body.reciverId;
            const result = await this.userService.requestToFriend(senderId,reciverId);
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
}