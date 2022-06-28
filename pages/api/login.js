import nextConnect from "next-connect";
import bcrypt from 'bcrypt';
import connectDb from "../../database/database";
import User from '../../models/User';
import SendToken from '../../helpers/sendToken';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "User not found");

        const comparePass = await bcrypt.compare(req.body.password, user.password);

        if (!comparePass) throw new ErrorHandler(httpStatusCodes.UNAUTHORIZED, "Invalid Creadetials");

        SendToken(user, res, "Welcome back");
    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;