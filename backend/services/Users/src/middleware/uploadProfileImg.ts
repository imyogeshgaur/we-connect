import multer from "multer"
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const tempProfileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve("../../../backend/services/Users/src/images")
        callback(null, pathToFolder);
    },
    filename:function(req, file, callback){
        callback(null,uuidv4() + Date.now() +path.extname(file.originalname))
    }
});
export const uploadProfile = multer({ storage: tempProfileStorage }).single("profile");