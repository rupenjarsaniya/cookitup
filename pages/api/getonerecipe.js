import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) return res.status(httpStatusCodes.NOT_FOUND).json("No recipe found");

        return res.status(httpStatusCodes.OK).json({ recipe });

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;