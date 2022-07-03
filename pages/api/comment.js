import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.put(async (req, res) => {

    try {

        const user = await User.findById(req.body.userId);

        if (!user) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Not allowed to comment on post");

        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) return res.status(httpStatusCodes.NOT_FOUND).json("Recipe not found");

        const commentObj = {
            user: req.body.userId,
            name: req.body.name,
            comment: req.body.comment
        };

        const saveData = await Recipe.updateOne({ $push: { comments: commentObj } });

        if (!saveData) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        return res.status(200).send("Commented");

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;