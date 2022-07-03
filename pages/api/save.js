import nextConnect from 'next-connect';
import connectDb from '../../database/database';
import User from '../../models/User';
import Recipe from '../../models/Recipe';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import AuthenticateUser from '../../middlewares/authenticateUser';

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.put(async (req, res) => {

    try {

        const user = await User.findById(req.userId);

        const recipe = await Recipe.findById(req.query.id);

        if (user.saverecipe.includes(req.query.id) && recipe.saverecipeusers.includes(req.userId)) {

            const unsaveRecipe = await user.updateOne({ $pull: { saverecipe: req.query.id } });

            const unsaveUserId = await recipe.updateOne({ $pull: { saverecipeusers: req.userId } });

            if (!unsaveRecipe || !unsaveUserId) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

            return res.status(httpStatusCodes.OK).send("Post has been removed from save");

        }

        else {

            const saveRecipe = await user.updateOne({ $push: { saverecipe: req.query.id } });

            const saveUserId = await recipe.updateOne({ $push: { saverecipeusers: req.userId } });

            if (!saveRecipe || !saveUserId) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

            return res.status(httpStatusCodes.OK).send("Post has been added to save");

        }
    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;