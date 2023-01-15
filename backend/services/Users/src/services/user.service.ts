import friendRequest from "../model/request.entity";
import User from "../model/user.entity";
import Friend from "../model/friend.entity";
import * as path from "path";
import * as fs from "fs"

export default class UsersService {
    async getAllUsers() {
        try {
            const users = await User.find({}, { _id: 0, authId: 0, __v: 0 });
            return users;
        } catch (error) {
            console.log(error);
        }
    }
    async getSingleUser(email: string) {
        try {
            const user = await User.findOne({ email }, { _id: 0, authId: 0, __v: 0 });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async getSingleUserFromId(id: string) {
        try {
            const user = await User.findOne({ authId: id }, { _id: 0, authId: 0, __v: 0 })
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async createUser(file: any, body: any) {
        try {
            const { name, phone, location, company, position, authId } = body;
            await User.init()
            const newUser = new User({ name, phone, location, company, position, image: file, authId });
            const user = await newUser.save();
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async updateUser(id: string, data: any) {
        try {
            const user = await User.findOne({ authId: id })
            if (user) {
                if(user.image !== data.image){
                    const imageUrl = user.image;
                    const image = imageUrl.substr(43);
                    const imagePath = path.join(process.cwd(), `src/images/${image}`)
                    fs.unlinkSync(imagePath);
                }
                const result = await user.updateOne(data.data)
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteUser(email: string) {
        try {
            const result = await User.deleteOne({ email }, { _id: 0, authId: 0, __v: 0 });
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    //! Friend Database Service

    //? Friend Request Service 
    async requestToFriend(senderId: string, reciverId: string) {
        try {
            const friendData = await friendRequest.create({ senderId, reciverId })
            const result = await friendData.save();
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async seeFriendRequest(senderId: string) {
        try {
            const friendRequests = await friendRequest.find({ senderId })
            const reciverIdArr = Array();
            for (let i = 0; i < friendRequests.length; i++) {
                reciverIdArr.push(friendRequests[i].reciverId)
            }
            return reciverIdArr;
        } catch (error) {
            console.log(error);
        }

    }

    //? Friend Service
    async setFriend(requesterId:string,approverId:string){
        try {
            const friendData = await Friend.create({ requesterId ,approverId})
            const result = await friendData.save();
            console.log(result)
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async getFriend(requesterId:string){

    }
}