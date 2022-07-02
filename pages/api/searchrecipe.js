import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {

        const recipe = await Recipe.find({ title: { $regex: '.*' + req.body.search + '.*' } });

        if (recipe.length === 0) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No Recipe found");

        return res.status(httpStatusCodes.OK).json({ recipe: recipe });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;