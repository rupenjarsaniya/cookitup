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

handler.post(async (req, res) => {

    try {
        const url = 'http://' + req.headers.host;

        let foodImage = "";

        if (req.file) foodImage = url + '/foodimg/' + req.file.filename;

        const recipe = await Recipe.find({ user: req.userId, title: req.body.title });

        if (recipe.length !== 0) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Recipe already posted");

        const createData = new Recipe({
            user: req.userId,
            title: req.body.title,
            makingsteps: JSON.parse(req.body.makingsteps),
            ingredients: req.body.ingredients,
            foodimg: foodImage
        });

        const saveData = await createData.save();

        if (!saveData) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(httpStatusCodes.OK).json({ recipe: saveData, message: "Post Completed" });

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