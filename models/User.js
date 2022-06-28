import mongoose from "mongoose";
import { Jwt } from "jsonwebtoken";
import validator from "validator";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name must be atleast 3 characters"],
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Enter valid email address"],
        required: true
    },
    password: {
        type: String,
        minlength: [4, "Password must be atleast 4 character long"],
        required: true
    },
    profileimg: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    expertin: {
        type: String,
        default: ""
    },
    expirence: {
        type: String,
        default: ""
    },
    saverecipe: {
        type: Array,
        default: []
    }
}, { Timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;