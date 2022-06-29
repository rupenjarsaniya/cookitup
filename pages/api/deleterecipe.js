import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";
import AuthenticateUser from "../../middlewares/authenticateUser";

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.delete(async (req, res) => {

    try {
        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No recipe found");

        if (recipe.user.toString() !== req.userId) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Not allowed to delete recipe");

        const deleteRecipe = await recipe.remove();

        if (!deleteRecipe) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(httpStatusCodes.OK).json({ recipe, message: "Post Deleted" });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;