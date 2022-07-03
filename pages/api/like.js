import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";
import AuthenticateUser from '../../middlewares/authenticateUser';

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.put(async (req, res) => {

    try {

        const user = await User.findById(req.userId);

        if (!user) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Not allowed to like/dislike on post");

        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) return res.status(httpStatusCodes.NOT_FOUND).json("Recipe not found");

        if (!recipe.likes.includes(req.userId)) {

            const likePost = await recipe.updateOne({ $push: { likes: req.userId } });

            if (likePost) return res.status(httpStatusCodes.OK).json({ message: "The post has been liked" });

            return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");
        }

        else {
            const dislikePost = await recipe.updateOne({ $pull: { likes: req.userId } });

            if (dislikePost) return res.status(httpStatusCodes.OK).json({ message: "The post has been disliked" });

            return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");
        }


    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;