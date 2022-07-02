import nextConnect from "next-connect";
import Feedback from "../../models/Feedback";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
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

            if (!saveNewFeedback) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

            return res.status(httpStatusCodes.OK).json({ feedback: saveNewFeedback });

        }

        fb.user = req.userId;
        fb.name = req.body.name;
        fb.message = req.body.message;
        fb.rating = req.body.rating;

        const saveFeedback = await fb.save();

        if (!saveFeedback) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(httpStatusCodes.OK).json({ feedback: saveFeedback });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;