import express from "express";
const app = express();
import cors from "cors";
import { createConnection } from "./database/db.config";
import { UserController } from "./controllers/user.controller";

createConnection();
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Credentials');
    next();
  });
  app.get("/list", async(req, res) => {
    try {
        const userController = new UserController();
        await userController.getAllUsers(req, res);
    } catch (error) {
        console.log("User's Service : Global Error " + error);
    }
})
app.get("/get/:email", async(req, res) => {
    try {
        const userController = new UserController();
        await userController.getSingleUser(req, res);
    } catch (error) {
        console.log("User's Service : Global Error " + error);
    }
})
app.get("/getUser/:authId", async(req, res) => {
    try {
        const userController = new UserController();
        await userController.getUserFromId(req, res);
    } catch (error) {
        console.log("User's Service : Global Error " + error);
    }
})
app.post("/create", async(req, res) => {
    try {
        const userController = new UserController();
        await userController.createUser(req, res);
    } catch (error) {
        console.log("User's Service : Global Error " + error);
    }
})
app.put("/update/:id", async(req, res) => {
    try {
        const userController = new UserController(); 
        await userController.updateUser(req, res);
    } catch (error) {
        console.log("Global Error " + error);
    }
})
app.delete("/delete/:email", async(req, res) => {
    try {
        const userController = new UserController();
        await userController.deleteUser(req, res);
    } catch (error) {
        console.log("User's Service : Global Error " + error);
    }
})

app.listen(5001,()=>console.log("User Service is Running !!!!"))