import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";
import AuthenticateUser from "../../middlewares/authenticateUser";

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.get(async (req, res) => {

    try {

        const recipe = await Recipe.find({ user: req.userId });

        if (recipe.length === 0) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No recipe found");

        return res.status(httpStatusCodes.OK).json({ recipe });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;