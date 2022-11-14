import { Request, Response } from "express";
import { UsersService } from "../services/user.service";


export class UserController {
    protected userService = new UsersService();

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
            const userToCreate = await this.userService.createUser(req.body);
            return res.status(200).send(userToCreate);
        } catch (error) {
            console.log(error);
            return res.status(500).send("User's Service : Internal Server Error !!!");
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updateResult = await this.userService.updateUser(id, data);
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
}