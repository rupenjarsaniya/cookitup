import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No recipe found");

        return res.status(httpStatusCodes.OK).json({ recipe });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;