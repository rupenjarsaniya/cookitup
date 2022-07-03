import jwt from 'jsonwebtoken';
import httpStatusCodes from '../helpers/httpStatusCodes';

const AuthenticateUser = async (req, res, next) => {

    try {

        const token = req.headers.token;

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = user._id;

        next();

    }

    catch (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Something went wrong");
    }

};

module.exports = AuthenticateUser;