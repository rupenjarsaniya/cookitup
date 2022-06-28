import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        minlength: [3, "Title must be atleast 3 characters"],
        required: true
    },
    makingsteps: {
        type: Object,
        require: true
    },
    ingredients: {
        type: String,
        minlength: [4, "Password must be atleast 4 character long"],
        required: true
    },
    foodimg: {
        type: String,
        default: ""
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }],
    savereceipeusers: {
        type: Array,
        default: []
    }
}, { Timestamps: true });

const Recipe = new mongoose.model("Recipe", RecipeSchema);
export default Recipe;