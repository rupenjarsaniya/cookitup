require('dotenv').config()
import nextConnect from "next-connect";
import bcrypt from 'bcrypt';
import connectDb from "../../database/database";
import Otp from '../../models/Otp';
import Forgottoken from '../../models/Forgottoken';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import nodemailer from 'nodemailer';


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

            // Send token to user
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: true,
                auth: {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.ADMIN_EMAIL,
                to: req.body.email,
                subject: "Forgot Password",
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                      <div style="margin:50px auto;width:70%;padding:20px 0">
                        <div style="border-bottom:1px solid #eee">
                          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CookItUp</a>
                        </div>
                        <p style="font-size:1.1em">Hi,</p>
                        <p>Thank you for choosing CookItUp. Use the following link to reset password procedures. link is valid for 5 minutes</p>
                        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href='${req.headers.origin}/forgot/password/token=${token}' style="text-decoration: none; color: white;">Reset Password</a></h2>
                        <p style="font-size:0.9em;">Regards,<br />CookItUp</p>
                        <hr style="border:none;border-top:1px solid #eee" />
                        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                          <p>CookItUp</p>
                          <p>Ahmedabad</p>
                        </div>
                      </div>
                    </div>`,
            });

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