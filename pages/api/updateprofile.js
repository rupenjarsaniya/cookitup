import nextConnect from 'next-connect';
import connectDb from '../../database/database';
import User from '../../models/User';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import upload from '../../middlewares/profileimage';
import AuthenticateUser from '../../middlewares/authenticateUser';

const handler = nextConnect();

handler.use(connectDb);
handler.use(AuthenticateUser);
handler.use(upload.single('profileimg'));

handler.put(async (req, res) => {
    // Change http:// to protocol
    try {

        const { name, username, email, gender, location, expertin, expirence } = req.body;

        let userobj = {};

        const checkusername = await User.findOne({ username });

        if (checkusername) return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json("Username already taken");

        if (username) { userobj.username = username };
        if (name) { userobj.name = name };
        if (email) { userobj.email = email };
        if (gender) { userobj.gender = gender };
        if (location) { userobj.location = location };
        if (expertin) { userobj.expertin = expertin };
        if (expirence) { userobj.expirence = expirence };
        if (req.file) { userobj.profileimg = '/userprofileimg/' + req.file.filename };

        const updateUser = await User.findByIdAndUpdate(req.userId, { $set: userobj }, { new: true, runValidators: true });

        if (!updateUser) return res.status(httpStatusCodes.INTERNAL_SERVER).json("Someting went wrong");

        return res.status(200).json({ user: updateUser, message: "Profile Updated" });

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};