import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    otp: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: {
            expires: 300
        }
    }
}, { timestamps: true });

const Otp = new mongoose.model("Otp", OtpSchema);

module.exports = Otp;