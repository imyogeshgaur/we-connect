import { Request, Response } from "express";
import UsersService from "../services/user.service";
import axios from "axios";

export default class UserController {
    protected userService = new UsersService();

    async getAllAuthUsers() {
        try {
            const response = await axios.get(process.env.GET_AUTH_URI as string)
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async getSingleAuthUser(id: string) {
        try {
            const response = await axios.get(process.env.GET_SINGLE_AUTH_URI as string + id)
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const users: any = await this.userService.getAllUsers();
            const authUsers = await this.getAllAuthUsers();
            const finalArray = Array();
            if (users.length != 0) {
                for (let i = 0; i < users.length; i++) {
                    finalArray.push({ user: users[i], auth: authUsers[i] })
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
            const userToCreate = await this.userService.createUser(file, req.body);
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
            const actData = { data, image: file }
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
            const deleteResult: any = await this.userService.deleteUser(email);
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
    async requestToFriend(req: Request, res: Response) {
        try {
            const senderId = req.params.id;
            const reciverId = req.body.reciverId;
            const result = await this.userService.requestToFriend(senderId, reciverId);
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
    async seeFriendRequest(req: Request, res: Response) {
        try {
            const senderId = req.params.id;
            const result: any = await this.userService.seeFriendRequest(senderId);
            const friendToRequested = Array();
            for (let i = 0; i < result.length; i++) {
                const data = await this.getSingleAuthUser(result[i])
                friendToRequested.push(data)
            }
            return res.status(200).send(friendToRequested);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
    async setFriend(req: Request, res: Response) {
        try {
            const requesterId = req.params.requesterId;
            const approverId = req.body.approverId;
            const result = await this.userService.setFriend(requesterId,approverId);
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
    async getFriend(req: Request, res: Response) {
        try {
            const senderId = req.params.id;
            const result: any = await this.userService.seeFriendRequest(senderId);
            const friendToRequested = Array();
            for (let i = 0; i < result.length; i++) {
                const data = await this.getSingleAuthUser(result[i])
                friendToRequested.push(data)
            }
            return res.status(200).send(friendToRequested);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
}