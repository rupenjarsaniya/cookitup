import mongoose from "mongoose";

const ForgotTokenSchema = new mongoose.Schema({
    token: {
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

const Forgottoken = new mongoose.model("Forgottoken", ForgotTokenSchema);

module.exports = Forgottoken;