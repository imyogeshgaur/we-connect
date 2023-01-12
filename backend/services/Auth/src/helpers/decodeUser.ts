import jwt from "jsonwebtoken";

const decodeUser = (token:any) => {
    try {
        const user = jwt.decode(token, { complete: true });
        return user?.payload as string;
    } catch (error) {
        console.log("User Decode Error : ", error);
    }
}

export default decodeUser