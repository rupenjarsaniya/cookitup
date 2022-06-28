import mongoose from "mongoose";
import nextConnect from "next-connect";

const connecter = async (req, res) => {
    try {
        if (!mongoose.connections[0].readyState) {
            return;
        }
        await mongoose.connect(process.env.MONGO_URI, (error, con) => {

            error ? console.log("Something went wrong while connection to datbase") :
                console.log("Connection between database and " + con.host + " established")

        });
    }
    catch (error) {
        console.log(error);
    }
};

const connectDb = nextConnect();

connectDb.use(connecter);

export default connectDb;