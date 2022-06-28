import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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

OtpSchema.pre("save", async function (next) {
    if (this.isModified('otp')) {
        this.otp = await bcrypt.hash(this.otp, 12);
    }
    next();
});

const Otp = new mongoose.model("Otp", OtpSchema);

module.exports = Otp;