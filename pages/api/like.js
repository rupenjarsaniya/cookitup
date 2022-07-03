import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";
import AuthenticateUser from '../../middlewares/authenticateUser';

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.put(async (req, res) => {

    try {

        const user = await User.findById(req.userId);

        if (!user) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Not allowed to like/dislike on post");

        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "Recipe not found");

        if (!recipe.likes.includes(req.userId)) {

            const likePost = await recipe.updateOne({ $push: { likes: req.userId } });

            if (likePost) return res.status(httpStatusCodes.OK).json({ message: "The post has been liked" });
        }

        else {
            const dislikePost = await recipe.updateOne({ $pull: { likes: req.userId } });

            if (dislikePost) return res.status(httpStatusCodes.OK).json({ message: "The post has been disliked" });
        }

        if (!likePost || !dislikePost) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

    }

    catch (error) {
        console.log(error);
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;