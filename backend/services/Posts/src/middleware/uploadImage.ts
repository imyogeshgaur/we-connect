import multer from "multer"
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const tempPostStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve("../../../backend/services/Posts/src/images/post")
        callback(null, pathToFolder);
    },
    filename:function(req, file, callback){
        callback(null,uuidv4() + Date.now() +path.extname(file.originalname))
    }
});
const tempProfileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve("../../../backend/services/Posts/src/images/profile")
        callback(null, pathToFolder);
    },
    filename:function(req, file, callback){
        callback(null,uuidv4() + Date.now() +path.extname(file.originalname))
    }
});
export const uploadPost = multer({ storage: tempPostStorage }).single("post");
export const uploadProfile = multer({ storage: tempPostStorage }).single("profile");