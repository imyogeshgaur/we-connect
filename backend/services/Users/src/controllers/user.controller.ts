import { Request, Response } from "express";
import { UsersService } from "../services/user.service";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({path:path.resolve("./src/env/user.env")});
import axios from "axios";

export class UserController {
    protected userService = new UsersService();

    async getPostsForUser(email: string) {
        try {
            const response = await axios.get(process.env.GET_POST_URI as string + email)
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            if (users.length != 0) {
                return res.status(200).send(users);
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
                const post = await this.getPostsForUser(email)
                if (post) {
                    user.Post = post;
                    return res.status(200).send(user);
                } else {
                    return res.status(200).send(user);
                }
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
            const userToCreate = await this.userService.createUser(req.body);
            return res.status(200).send(userToCreate);
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const data = req.body;
            const updateResult = await this.userService.updateUser(email, data);
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
            const id = req.params.id;
            const user = this.userService.getSingleUserFromId(id);
            return user;
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
}