import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";
import AuthenticateUser from "../../middlewares/authenticateUser";

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.delete(async (req, res) => {

    try {
        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) return res.status(httpStatusCodes.NOT_FOUND).json("No recipe found");

        if (recipe.user.toString() !== req.userId) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Not allowed to delete recipe");

        const deleteRecipe = await recipe.remove();

        if (!deleteRecipe) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        return res.status(httpStatusCodes.OK).json({ recipe, message: "Post Deleted" });

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;