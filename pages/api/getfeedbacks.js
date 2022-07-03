import nextConnect from "next-connect";
import Feedback from "../../models/Feedback";
import connectDb from "../../database/database";
import httpStatusCodes from "../../helpers/httpStatusCodes";

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {

        const feedbacks = await Feedback.find();

        if (feedbacks.length === 0) return res.status(httpStatusCodes.NOT_FOUND).json("No feedbacks found");

        return res.status(httpStatusCodes.OK).json({ feedbacks });

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;