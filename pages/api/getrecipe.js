import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import AuthenticateUser from "../../middlewares/authenticateUser";

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.get(async (req, res) => {

    try {

        const recipe = await Recipe.find({ user: req.userId });

        if (recipe.length === 0) return res.status(httpStatusCodes.NOT_FOUND).json("No recipe found");

        return res.status(httpStatusCodes.OK).json(recipe);

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;