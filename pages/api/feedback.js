import nextConnect from "next-connect";
import Feedback from "../../models/Feedback";
import User from "../../models/User";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {

    try {

        const user = await User.findById(req.body.userId);

        if (!user) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Not allowed to give feedback");

        const fb = await Feedback.findOne({ user: req.body.userId });

        if (!fb) {

            const createFeedbackData = new Feedback({
                user: req.body.userId,
                name: req.body.name,
                message: req.body.message,
                rating: req.body.rating
            });


            const saveNewFeedback = await createFeedbackData.save();

            if (!saveNewFeedback) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

            return res.status(httpStatusCodes.OK).json({ feedback: saveNewFeedback });

        }

        fb.user = req.body.userId;
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