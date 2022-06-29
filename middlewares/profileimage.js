import multer from "multer";
import ErrorHandler from "../helpers/Errorhandler";
import httpStatusCodes from "../helpers/httpStatusCodes";

const DIR = './public/userprofileimg/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(".");
        cb(null, fileName[0] + Date.now() + Math.floor(Math.random(10)) + "." + fileName[1]);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, 'Only .png, .jpg and .jpeg format allowed!');
        }
    }
});

module.exports = upload;