import Post from "../model/post.entity";
import fs from "fs"
import path from "path"

export default class PostsService {
    async getAllPosts() {
        try {
            const posts = await Post.find();
            return posts;
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(created_by: string) {
        try {
            const post = await Post.find({ created_by });
            return post;
        } catch (error) {
            console.log(error);
        }
    }
    async getPostById(_id: string) {
        try {
            const post = await Post.findById(_id);
            return post;
        } catch (error) {
            console.log(error);
        }
    }

    async createPost(file: any, caption: string, hashtag: string, created_by: string) {
        try {
            const newPost = new Post({ image: file, caption, hashtag, created_by, created_at: Date.now() });
            const post = await newPost.save();
            return post;
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(id: string, data: any) {
        try {
            const post = await Post.findOne({ _id: id })
            if (post) {
                const dataUrl = data.image
                const imageUrl = post.image;
                const image = imageUrl.substr(40);
                const dataImage = dataUrl.substr(40);
                if (dataImage !== "undefined") {
                    const imagePath = path.join(process.cwd(), `src/images/${image}`)
                    fs.unlinkSync(imagePath);
                    const result = await post.updateOne(data)
                    console.log(result)
                    return result;
                } else {
                    const result = await post.updateOne({ ...data, image: imageUrl })
                    console.log(result)
                    return result;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(postId: string) {
        try {
            const postExist = await Post.findOne({ _id: postId });
            if (postExist) {
                const imageUrl = postExist.image;
                const image = imageUrl.substr(40);
                const imagePath = path.join(process.cwd(), `src/images/${image}`)
                fs.unlinkSync(imagePath);
                return await Post.deleteOne({ _id: postId });
            } else {
                return 0;
            }
        } catch (error) {
            console.log(error);
        }
    }
}