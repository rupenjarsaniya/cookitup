const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

mongoose.models = {};

const Feedback = new mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;