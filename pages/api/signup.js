import nextConnect from 'next-connect';
import connectDb from '../../database/database';
import User from '../../models/User';
import SendToken from '../../helpers/sendToken';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import upload from '../../middlewares/profileimage';

const handler = nextConnect();

handler.use(connectDb);
handler.use(upload.single('profileimg'));

handler.post(async (req, res) => {

    let profileimg = "";
    try {
        if (req.file) {
            profileimg = '/' + req.file.filename;
        }

        const username = await User.findOne({ username: req.body.username });

        if (username) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Username already taken");

        const user = await User.findOne({ email: req.body.email });

        if (user) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("This email id already in use");

        const createUser = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileimg: profileimg
        });

        const saveUser = await createUser.save();

        if (!saveUser) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Something went wrong");

        SendToken(saveUser, res, "Account Created");
    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default handler;
