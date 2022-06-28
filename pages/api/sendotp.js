import nextConnect from "next-connect";
import otpgenerator from 'otp-generator';
import connectDb from "../../database/database";
import User from '../../models/User';
import Otp from '../../models/Otp';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "User not found with this email id");

        const OTP = otpgenerator.generate(6, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false });

        console.log(OTP);

        // Send otp to user

        const createData = new Otp({
            email: req.body.email,
            otp: req.body.otp
        });

        const saveData = await createData.save();

        if (!saveData) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        return res.status(httpStatusCodes.OK).send("OTP send successfully");
    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;