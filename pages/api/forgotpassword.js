import nextConnect from "next-connect";
import bcrypt from "bcrypt";
import connectDb from "../../database/database";
import User from '../../models/User';
import Forgottoken from '../../models/Forgottoken';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {
    try {

        const getToken = await Forgottoken.findOne({ token: req.headers.passtoken });

        if (!getToken) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Password reset link was expire");

        if (req.body.password !== req.body.confirmpassword) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Passwords not matched");

        req.body.password = await bcrypt.hash(req.body.password, 12);

        const user = await User.findOneAndUpdate({ email: getToken.email }, { password: req.body.password }, { new: true });

        const deleteToken = await Forgottoken.remove();

        if (!user || !deleteToken) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(httpStatusCodes.OK).send("Password Changed");

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }
});

export default handler;