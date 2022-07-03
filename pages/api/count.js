import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {

        const recipes = await Recipe.countDocuments();
        const users = await User.countDocuments();

        if (recipes.length === 0) return res.status(httpStatusCodes.NOT_FOUND).json("No Recipe found");
        if (users.length === 0) return res.status(httpStatusCodes.NOT_FOUND).json("No Users found");

        return res.status(httpStatusCodes.OK).json({ recipes, users });

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;