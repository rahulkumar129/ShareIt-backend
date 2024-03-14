import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}/${DB_NAME}`
		);
		console.log(
			`MongoDB connected succesfully  !!! DB host :${connectionInstance.connection.host}`
		);
	} catch (error) {
		console.error("Error connecting to the database:", error);
	}
};

export default connectDB;
