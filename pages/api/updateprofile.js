import nextConnect from 'next-connect';
import connectDb from '../../database/database';
import User from '../../models/User';
import ErrorHandler from '../../helpers/Errorhandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import upload from '../../helpers/profileimage';

const handler = nextConnect();

handler.use(connectDb);
handler.use(upload.single('profileimg'));

handler.post(async (req, res) => {
    // Change http:// to protocol
    try {

        const url = 'http://' + req.headers.host;

        const { name, email, profileimg, gender, location, expertin, expirence } = req.body;

        let userobj = {};

        if (name) { userobj.name = name };
        if (email) { userobj.email = email };
        if (gender) { userobj.gender = gender };
        if (location) { userobj.location = location };
        if (expertin) { userobj.expertin = expertin };
        if (expirence) { userobj.expirence = expirence };
        if (profileimg) { userobj.profileimg = url + '/userprofileimg/' + req.file.filename };

        const updateUser = await User.findByIdAndUpdate(req.userId, { $set: userobj }, { new: true });

        if (!updateUser) throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, "Someting went wrong");

        return res.status(200).json({ user: updateUser, message: "Profile Updated" });

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

});

export default handler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};