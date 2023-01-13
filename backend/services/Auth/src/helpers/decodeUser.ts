import jwt from "jsonwebtoken";

const decodeUser = (token:any) => {
    try {
        const user:any = jwt.decode(token, { complete: true });
        return user?.payload.userId as string;
    } catch (error) {
        console.log("User Decode Error : ", error);
    }
}

export default decodeUser