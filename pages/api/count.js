import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {

        const recipes = await Recipe.countDocuments();
        const users = await User.countDocuments();

        if (recipes.length === 0) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No Recipe found");
        if (users.length === 0) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No Users found");

        return res.status(httpStatusCodes.OK).json({ recipes, users });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;