import express from "express";
import createConnection  from "./database/db.config"
const app = express();
import cors from "cors";
import  AuthController  from "./controllers/auth.controller";

createConnection();
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

app.get("/list",async(req,res)=>{
    try {
        const authController = new AuthController();
        await authController.listUsers(req,res);
    } catch (error) {
        console.log("Authentication Service : Global Error " + error);
    }
})

app.post("/signup", async (req, res) => {
    try {
        const authController = new AuthController();
        await authController.signup(req,res);
    } catch (error) {
        console.log("Authentication Service : Global Error " + error);
    }
})
app.post("/login", async (req, res) => {
    try {
        const authController = new AuthController();
        await authController.login(req,res);
    } catch (error) {
        console.log("Authentication Service : Global Error " + error);
    }
})

app.put("/updatePassword/:email", async(req,res)=>{
    try {
        const authController = new AuthController();
        await authController.resetPass(req,res);
    } catch (error) {
        console.log("Authentication Service : Global Error " + error);
    }
})

app.get("/forgetPassword/:email",async(req,res)=>{
    try {
        const authController = new AuthController();
        await authController.forgetPass(req,res);
    } catch (error) {
        console.log("Authentication Service : Global Error " + error);
    }
})
app.get("/getUser/:id", async(req, res) => {
    try {
        const authController = new AuthController();
        await authController.getUserFromId(req, res);
    } catch (error) {
        console.log("User's Service : Global Error " + error);
    }
})
app.get("/getLoginUser/:token", async(req, res) => {
    try {
        const authController = new AuthController();
        await authController.decodeUsers(req, res);
    } catch (error) {
        console.log("User's Service : Global Error " + error);
    }
})


app.listen(5003, () => console.log("Auth Service Is Running !!!"));

