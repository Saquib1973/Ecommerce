import mongoose from "mongoose";
import colors from "colors";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Connected to MongoDb Data base ${conn.connection.host}`.magenta.italic
        .underline
    );
  } catch (error) {
    console.log(`Error in mongoDB ${error}`.red.bold);
  }
};
export default connectDb;
