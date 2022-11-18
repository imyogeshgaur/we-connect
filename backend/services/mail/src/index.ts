import express from "express";
const app = express();
import cors from "cors";
import { MailController } from "./controllers/mail.controller";


app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Credentials');
    next();
});

app.post("/create", async(req,res)=>{
    try {
        const mailController = new MailController();
        await mailController.createMail(req,res);
    } catch (error) {
        console.log("Mail's Service : Global Error " + error);
    }
})


app.listen(5004, () => console.log("Mail Service Is Running !!!"));

