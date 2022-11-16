import User from "../model/user.entity";

export class UsersService{
    async getAllUsers(){
        const users = await User.find().limit(5);
        return users;
    }
    async getSingleUser(email:string){
        const user = await User.findOne({email});
        return user;
    }
    async getSingleUserFromId(id:string){
        const user = await User.findOne({authId:id},{_id:0,authId:0,__v:0})
        return user;
    }
    async createUser(file:any, body:any){
        const{name,phone,location,company,position,authId} = body;
        await User.init()
        const newUser = new User({name,phone,location,company,position,image:file,authId});
        const user=  await newUser.save();
        return user;
    }
    async updateUser(id:string,data:any){
        const user = await User.findOne({authId:id})
        if(user){
          const result = await user.updateOne(data)
          return result;
        }
    }
    async deleteUser(email:string){
        const result =  await User.deleteOne({email});
        return result;
    }
}