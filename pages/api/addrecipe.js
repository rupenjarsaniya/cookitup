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

handler.post(async (req, res) => {
    try {

        let foodImage = "";

        if (req.file) foodImage = '/' + req.file.filename;

        const recipe = await Recipe.find({ user: req.userId, title: req.body.title });

        if (recipe.length !== 0) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Recipe already posted");

        const createData = new Recipe({
            user: req.userId,
            title: req.body.title,
            makingsteps: JSON.parse(req.body.makingsteps),
            ingredients: req.body.ingredients,
            foodimg: foodImage
        });

        const saveData = await createData.save();

        if (!saveData) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        return res.status(httpStatusCodes.OK).json({ recipe: saveData, message: "Post Completed" });

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