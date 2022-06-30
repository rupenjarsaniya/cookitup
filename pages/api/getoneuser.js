import nextConnect from "next-connect";
import connectDb from "../../database/database";
import User from '../../models/User';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {


        const userdata = await User.findById(req.query.id).select({ password: 0 });

        if (!userdata) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "User not found");

        return res.status(httpStatusCodes.OK).json(userdata);


    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;