import nextConnect from "next-connect";
import bcrypt from 'bcrypt';
import connectDb from "../../database/database";
import Otp from '../../models/Otp';
import Forgottoken from '../../models/Forgottoken';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {
    try {
        const otpHolder = await Otp.find({ email: req.body.email });

        if (otpHolder.length === 0) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "Otp was expire");

        const rightOtp = otpHolder[otpHolder.length - 1];

        const compareOtp = await bcrypt.compare(req.body.otp, rightOtp.otp);

        if (rightOtp.email === req.body.email && compareOtp) {

            const token = "ahgh4p8ypt734yu09ciuivp984ty98p4u3";

            console.log(token);

            // Send token to user

            const createData = new Forgottoken({
                token: token,
                email: rightOtp.email
            });

            const saveData = await createData.save();

            const deleteOtp = await Otp.deleteMany({ email: rightOtp.email });

            if (!saveData || !deleteOtp) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

            return res.status(httpStatusCodes.OK).send("Password reset link sended to your email id");

        }

        else throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, "Wrong OTP");

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }
});

export default handler;