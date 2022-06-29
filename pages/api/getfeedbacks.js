import nextConnect from "next-connect";
import Feedback from "../../models/Feedback";
import connectDb from "../../database/database";
import ErrorHandler from "../../helpers/Errorhandler";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {

        const feedbacks = await Feedback.find();

        if (feedbacks.length === 0) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "No feedbacks found");

        return res.status(httpStatusCodes.OK).json({ feedbacks });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;