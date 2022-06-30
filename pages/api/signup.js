import nextConnect from 'next-connect';
import connectDb from '../../database/database';
import User from '../../models/User';
import SendToken from '../../helpers/sendToken';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import upload from '../../middlewares/profileimage';

const handler = nextConnect();

handler.use(connectDb);
handler.use(upload.single('profileimg'));

handler.post(async (req, res) => {
    // Change http:// to protocol
    const url = 'http://' + req.headers.host;
    let profileimg = "";
    try {
        if (req.file) {
            profileimg = url + '/userprofileimg/' + req.file.filename;
        }

        const user = await User.findOne({ email: req.body.email });

        if (user) throw new ErrorHandler(httpStatusCodes.METHOD_NOT_ALLOWED, "This email id already in use");

        const createUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileimg: profileimg
        });

        const saveUser = await createUser.save();

        if (!saveUser) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Something went wrong");

        SendToken(saveUser, res, "Account Created");
    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default handler;
