import nextConnect from "next-connect";
import bcrypt from 'bcrypt';
import connectDb from "../../database/database";
import User from '../../models/User';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import AuthenticateUser from '../../middlewares/authenticateUser';

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.post(async (req, res) => {
    console.log(req.body);
    try {

        const user = await User.findById(req.userId);

        if (req.body.password !== req.body.confirmpassword) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Passwords not matched");

        if (req.body.password === req.body.currentpassword) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "New password cannot same as current password");

        const comparePass = await bcrypt.compare(req.body.currentpassword, user.password);

        if (!comparePass) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Current password is wrong");

        user.password = req.body.password;

        const saveUser = await user.save();

        if (!saveUser) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(httpStatusCodes.OK).send("Password Changed");

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }
});

export default handler;