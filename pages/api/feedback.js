import nextConnect from "next-connect";
import Feedback from "../../models/Feedback";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";
import AuthenticateUser from "../../middlewares/authenticateUser";

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.post(async (req, res) => {

    try {

        const fb = await Feedback.findOne({ user: req.userId });

        if (!fb) {

            const createFeedbackData = new Feedback({
                user: req.userId,
                name: req.body.name,
                message: req.body.message,
                rating: req.body.rating
            });


            const saveNewFeedback = await createFeedbackData.save();

            if (!saveNewFeedback) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

            return res.status(httpStatusCodes.OK).json({ feedback: saveNewFeedback });

        }

        fb.user = req.userId;
        fb.name = req.body.name;
        fb.message = req.body.message;
        fb.rating = req.body.rating;

        const saveFeedback = await fb.save();

        if (!saveFeedback) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        return res.status(httpStatusCodes.OK).json({ feedback: saveFeedback });

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;