import nextConnect from "next-connect";
import connectDb from "../../database/database";
import User from '../../models/User';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import AuthenticateUser from '../../middlewares/authenticateUser';

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.get(async (req, res) => {

    try {

        const userdata = await User.findById(req.userId).select({ password: 0 });

        return res.status(httpStatusCodes.OK).json(userdata);

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;