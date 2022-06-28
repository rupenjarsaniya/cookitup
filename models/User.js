import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from 'bcrypt';
import ErrorHandler from "../helpers/Errorhandler";
import httpStatusCodes from "../helpers/httpStatusCodes";

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

UserSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

UserSchema.methods.generateToken = async function (req, res) {
    try {
        return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    }
    catch (error) {
        throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Something went wrong while generating token");
    }
}

mongoose.models = {};
const User = mongoose.model("User", UserSchema);
export default User;