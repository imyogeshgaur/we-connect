import express from "express";
const app = express();
import cors from "cors";
import { createConnection } from "./database/db.config";
import { PostController } from "./controllers/post.controller";
import { uploadPost } from "./middleware/uploadImage";
import path from "path";


createConnection();
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Credentials');
    next();
  });

app.use("/static/post",express.static(path.join(process.cwd(),"src/images/post")))

  app.get("/list", async(req, res) => {
    try {
        const postController = new PostController();
        await postController.getAllPosts(req, res);
    } catch (error) {
        console.log("Post's Service : Global Error " + error);
    }
})
app.get("/find/:created_by", async(req, res) => {
    try {
        const postController = new PostController();
        await postController.getPosts(req, res);
    } catch (error) {
        console.log("Post's Service : Global Error " + error);
    }
})
app.get("/findById/:post_id", async(req, res) => {
    try {
        const postController = new PostController();
        await postController.getPostById(req, res);
    } catch (error) {
        console.log("Post's Service : Global Error " + error);
    }
})

app.post("/create",uploadPost,async(req, res) => {
    try {
        const postController = new PostController();
        await postController.createPost(req, res);
    } catch (error) {
        console.log("Post's Service : Global Error " + error);
    }
})
app.put("/update/:created_by", async(req, res) => {
    try {
        const postController = new PostController();     
        await postController.updatePost(req, res);
    } catch (error) {
        console.log("Post's Service : Global Error " + error);
    }
})
app.delete("/delete/:created_by", async(req, res) => {
    try {
        const postController = new PostController();
        await postController.deletePost(req, res);
    } catch (error) {
        console.log("Post's Service : Global Error " + error);
    }
})

app.listen(5002,()=>console.log("Post Service is Running !!!!"))