import mongoose from "mongoose";
import nextConnect from "next-connect";

const connecter = async (req, res, next) => {
    try {
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        return next();
    }
    catch (error) {
        console.log(error);
    }
};

const connectDb = nextConnect();

connectDb.use(connecter);

export default connectDb;