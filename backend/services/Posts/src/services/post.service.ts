import Post from "../model/post.entity";

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
    
    async deletePost(created_by:string){
        const result =  await Post.deleteOne({created_by});
        return result;
    }
}