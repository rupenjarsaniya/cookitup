import nextConnect from "next-connect";
import connectDb from "../../database/database";
import User from '../../models/User';
import httpStatusCodes from '../../helpers/httpStatusCodes';

const handler = nextConnect();

handler.use(connectDb);

handler.get(async (req, res) => {

    try {


        const userdata = await User.findById(req.query.id).select({ password: 0 });

        if (!userdata) return res.status(httpStatusCodes.NOT_FOUND).json("User not found");

        return res.status(httpStatusCodes.OK).json(userdata);


    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

});

export default handler;