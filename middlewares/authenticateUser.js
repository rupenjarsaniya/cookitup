import jwt from 'jsonwebtoken';
import ErrorHandler from '../helpers/Errorhandler';
import httpStatusCodes from '../helpers/httpStatusCodes';

const AuthenticateUser = async (req, res, next) => {

    try {

        const token = req.headers.token;

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = user._id;

        next();

    }

    catch (error) {
        throw new ErrorHandler(httpStatusCodes.BAD_REQUEST, error);
    }

};

module.exports = AuthenticateUser;