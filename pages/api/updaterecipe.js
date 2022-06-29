import nextConnect from "next-connect";
import Recipe from "../../models/Recipe";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
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

        if (!recipe) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No recipe found");

        if (recipe.user.toString() !== req.userId) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Not allowed to udpate recipe");

        const url = 'http://' + req.headers.host;

        const { title, makingsteps, ingredients } = req.body;

        if (title) recipe.title = title;
        if (makingsteps) recipe.makingsteps = JSON.parse(makingsteps);
        if (ingredients) recipe.ingredients = ingredients;
        if (req.file) recipe.foodimg = url + '/foodimg/' + req.file.filename;;

        const updateRecipe = await recipe.save();

        if (!updateRecipe) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(httpStatusCodes.OK).json({ recipe, message: "Post Updated" });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};