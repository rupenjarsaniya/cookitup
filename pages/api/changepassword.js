import nextConnect from "next-connect";
import bcrypt from 'bcrypt';
import connectDb from "../../database/database";
import User from '../../models/User';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import AuthenticateUser from '../../middlewares/authenticateUser';

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);

handler.put(async (req, res) => {
    console.log(req.body);
    try {

        const user = await User.findById(req.userId);

        if (req.body.password !== req.body.confirmpassword) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Passwords not matched");

        const comparePass = await bcrypt.compare(req.body.currentpassword, user.password);

        if (!comparePass) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Current password is wrong");

        if (req.body.password === req.body.currentpassword) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("New password cannot same as current password");

        user.password = req.body.password;

        const saveUser = await user.save();

        if (!saveUser) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        return res.status(httpStatusCodes.OK).send("Password Changed");

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }
});

export default handler;