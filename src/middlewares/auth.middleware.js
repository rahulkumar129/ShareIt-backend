import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
	try {
		const token = req.cookies?.accessToken;

		if (!token) {
			console.log("Unauthorized login request");
			// res.status(401).json({ message: "Unauthorized request" });
			next();
		} else {
			const decodedToken = jwt.verify(
				token,
				process.env.ACCESS_TOKEN_SECRET
			);

			const user = await User.findById(decodedToken?._id);
			// .select("-password -refreshToken");
			if (!user) {
				res.status(401).json({ message: "Invalid Access Token" });
			}

			req.user = user;
			next();
		}
	} catch (error) {
		console.log("Error accessing access token from cookie!!", error);
		// res.status(401).json({ message: "Invalid access token" });
		next();
	}
};
