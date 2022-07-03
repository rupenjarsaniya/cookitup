import nextConnect from "next-connect";
import bcrypt from "bcrypt";
import connectDb from "../../database/database";
import User from '../../models/User';
import Forgottoken from '../../models/Forgottoken';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {
    try {

        const getToken = await Forgottoken.findOne({ token: req.headers.passtoken });

        if (!getToken) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Password reset link was expire");

        if (req.body.password !== req.body.confirmpassword) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Passwords not matched");

        req.body.password = await bcrypt.hash(req.body.password, 12);

        const user = await User.findOneAndUpdate({ email: getToken.email }, { password: req.body.password }, { new: true });

        const deleteToken = await Forgottoken.remove();

        if (!user || !deleteToken) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        return res.status(httpStatusCodes.OK).send("Password Changed");

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }
});

export default handler;