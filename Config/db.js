import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb database: ${con.connection.name}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in ${error}`.bgRed.white);
    }
}

export default connectDB;