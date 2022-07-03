import nextConnect from "next-connect";
import bcrypt from 'bcrypt';
import connectDb from "../../database/database";
import User from '../../models/User';
import SendToken from '../../helpers/sendToken';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(httpStatusCodes.BAD_REQUEST).json("User not found");

        const comparePass = await bcrypt.compare(req.body.password, user.password);

        if (!comparePass) return res.status(httpStatusCodes.UNAUTHORIZED).json("Invalid Creadetials");

        SendToken(user, res, "Welcome back");
    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;