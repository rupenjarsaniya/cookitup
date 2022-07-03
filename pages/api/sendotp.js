require('dotenv').config()
import nextConnect from "next-connect";
import otpgenerator from 'otp-generator';
import connectDb from "../../database/database";
import User from '../../models/User';
import Otp from '../../models/Otp';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import nodemailer from 'nodemailer';

const handler = nextConnect();

handler.use(connectDb);

handler.post(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body });

    if (!user) throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "User not found with this email id");

    const OTP = otpgenerator.generate(6, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false });

    // Send otp to user
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: req.body,
      subject: "Forgot Password",
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CookItUp</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing CookItUp. Use the following OTP to complete your reset password procedures. OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
              <p style="font-size:0.9em;">Regards,<br />CookItUp</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>CookItUp</p>
                <p>Ahmedabad</p>
              </div>
            </div>
          </div>`,
    });

    if (!info) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong, Please try after sometime");

    const createData = new Otp({
      email: req.body,
      otp: OTP
    });

    const saveData = await createData.save();

    if (!saveData) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

    return res.status(httpStatusCodes.OK).send("OTP send successfully");
  }

  catch (error) {
    console.log(error);
    throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
  }

});

export default handler;