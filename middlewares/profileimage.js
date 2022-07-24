import multer from "multer";
import httpStatusCodes from "../helpers/httpStatusCodes";

const DIR = process.env.WEBRJ + '/userprofileimg/';

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
            return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Only .png, .jpg and .jpeg format allowed!");
        }
    }
});

module.exports = upload;