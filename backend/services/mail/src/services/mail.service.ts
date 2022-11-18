import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({ path: path.resolve("./src/env/mail.env") });

export class MailService {
   async createMail(data:any){   
        const {to,subject,text} = data
        const options  = {from:process.env.FROM,to,subject,text}
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.FROM,
              pass: process.env.PASSWORD
            }
          });  
        const mailTransporter = nodemailer.createTransport(transport)
        mailTransporter.sendMail(options, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent !!!' +info);
            }
          });
   }
}