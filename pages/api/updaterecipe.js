import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";
import AuthenticateUser from "../../middlewares/authenticateUser";
import uploadfoodimg from "../../middlewares/foodimage";

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);
handler.use(uploadfoodimg.single('foodimg'));

handler.put(async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.query.id);

        if (!recipe) return res.status(httpStatusCodes.NOT_FOUND).json("No recipe found");

        if (recipe.user.toString() !== req.userId) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Not allowed to udpate recipe");

        const { title, makingsteps, ingredients } = req.body;

        if (title) recipe.title = title;
        if (makingsteps) recipe.makingsteps = JSON.parse(makingsteps);
        if (ingredients) recipe.ingredients = ingredients;
        if (req.file) recipe.foodimg = '/' + req.file.filename;;

        const updateRecipe = await recipe.save();

        if (!updateRecipe) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        return res.status(httpStatusCodes.OK).json({ recipe, message: "Post Updated" });

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};