import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.put(async (req, res) => {

    try {

        const user = await User.findById(req.body.userId);

        if (!user) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Not allowed to comment on post");

        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "Recipe not found");

        const commentObj = {
            user: req.body.userId,
            name: req.body.name,
            comment: req.body.comment
        };

        const saveData = await Recipe.updateOne({ $push: { comments: commentObj } });

        if (!saveData) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(200).send("Commented");

    }

    catch (error) {
        console.log(error);
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;