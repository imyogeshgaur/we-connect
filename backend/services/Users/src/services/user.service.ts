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
        const user = await User.findById(id)
        return user;
    }
    async createUser(body:any){
        const{name,email,phone,location,company,position} = body;
        const newUser = new User({name,email,phone,location,company,position});
        const user=  await newUser.save();
        return user;
    }
    async updateUser(email:string,data:any){
        const user = await User.findOne({email})
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