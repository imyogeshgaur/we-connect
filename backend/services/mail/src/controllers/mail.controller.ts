import { Request, Response } from "express";
import { MailService } from "../services/mail.service";
import axios from "axios";

export class AuthController {
    protected authService = new MailService();
    
}