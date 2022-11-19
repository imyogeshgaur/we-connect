import Post from "../model/post.entity";
import fs from "fs"
import path from "path"

export class PostsService{
    async getAllPosts(){
        const posts = await Post.find();
        return posts;
    }

    async getPosts(created_by:string){
        const post = await Post.find({created_by});
        return post;
    }
    async getPostById(_id:string){
        const post = await Post.findById(_id);
        return post;
    }

    async createPost(file:any,caption:string,hashtag:string,created_by:string){
        const newPost = new Post({image:file,caption,hashtag,created_by,created_at:Date.now()});
        const post=  await newPost.save();
        return post;
    }

    async updatePost(created_by:string,data:any){
        const post = await Post.findOne({created_by})
        if(post){
          const result = await post.updateOne(data)
          return result;
        }
    }
    
    async deletePost(postId:string){
        const postExist = await Post.findOne({_id:postId});
        if(postExist){
            const imageUrl = postExist.image;
            const image = imageUrl.substr(40);
            const imagePath = path.join(process.cwd(),`src/images/${image}`)
            fs.unlinkSync(imagePath);
            return await Post.deleteOne({_id:postId});
        }else{
            return 0;
        }
    }
}