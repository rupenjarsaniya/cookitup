import httpStatusCodes from "./httpStatusCodes";

const SendToken = async (user, res, message) => {
    const token = await user.generateToken();

    res.status(httpStatusCodes.OK).json({ user, token, message })
};

module.exports = SendToken;