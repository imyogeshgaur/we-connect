import { Request, Response } from "express";
import { PostsService } from "../services/post.service";
import { Posthelpers } from "../helpers/post.helpers";
import dotenv from "dotenv";
import * as path from "path"
dotenv.config({path:path.resolve("./src/env/post.env")});

export class PostController {
    protected postService = new PostsService();
    protected postHelper = new Posthelpers();

    async getAllPosts(req: Request, res: Response) {
        try {
            const users = await this.postService.getAllPosts();
            if (users.length != 0) {
                return res.status(200).send(users);
            } else {
                return res.status(200).send("No Post Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Post's Service : Internal Server Error !!!");
        }
    }

    async getPosts(req: Request, res: Response) {
        try {
            const created_by = req.params.created_by; 
            const posts = await this.postService.getPosts(created_by);
            if (posts.length!=0) {
                return res.status(200).send(posts)
            } else {
                return res.status(200).send("No Post Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Post's Service : Internal Server Error !!!");
        }
    }
    async getPostById(req: Request, res: Response) {
        try {
            const post_id = req.params.post_id;       
            const post = await this.postService.getPostById(post_id);
            if (post) {
                return res.status(200).send(post)
            } else {
                return res.status(200).send("No Post Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Post's Service : Internal Server Error !!!");
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const caption = req.body.caption;
            const hashtag = req.body.hashtag;
            const token = req.body.token;
            const file = process.env.USER_POST_PREFIX as string + req.file?.filename;
            const user = await this.postHelper.decodeUsers(token);
            const created_by = user.auth.email
            const postToCreate = await this.postService.createPost(file,caption,hashtag,created_by);
            return res.status(200).send(postToCreate);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Post's Service : Internal Server Error !!!");
        }
    }
    
    async updatePost(req: Request, res: Response) {
        try {
            const created_by = req.params.created_by;
            const data = req.body;
            const updateResult = await this.postService.updatePost(created_by, data);
            if (updateResult.modifiedCount) {
                return res.status(200).send("Post Updated !!!")
            } else {
                return res.status(200).send("No Match Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Post's Service : Internal Server Error !!!");
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            const deleteResult = await this.postService.deletePost(postId);
            if (deleteResult != 0) {
                return res.status(200).send("Deleted Sucessfully !!!")
            } else {
                return res.status(200).send("No Match Found !!!")
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Post's Service : Internal Server Error !!!");
        }
    }
}