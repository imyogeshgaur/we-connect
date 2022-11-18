import { Request, Response } from "express";
import { MailService } from "../services/mail.service";

export class MailController {
    protected mailService = new MailService();
    async createMail(req:Request,res:Response){
        try {
            const data = req.body; 
            await this.mailService.createMail(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
    
}