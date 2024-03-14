import { User } from "../models/user.models.js";

const AccessToken = async (username) => {
	try {
		const user = await User.findOne(username);
		const accessToken = user.generateAccessToken();

		return accessToken;
	} catch (error) {
		console.log("Something went wrong while generating access token");
	}
};

const loginUser = (req, res) => {
	console.log(req.user);
	(async () => {
		try {
			const { username, password } = req.body;
			const NewUser = await User.findOne({
				username,
			});
			if (NewUser && NewUser["password"] == password) {
				console.log("User", NewUser["username"], "login successful");

				const options = {
					httpOnly: true,
					secure: true,
				};

				const accessToken = await AccessToken({
					username: NewUser.username,
				});
				res.status(200)
					.cookie("accessToken", accessToken, options)
					.json({
						message: "Login Successful",
					});
			} else {
				res.status(401).json({
					message: "Invalid Credantials",
				});
			}
		} catch (error) {
			console.error("Error verifying user!! ", error);
			res.status(500).json({
				message: "Internal Server Error ☹️",
			});
		}
	})();
	// }
};

const isLogged = async (req, res) => {
	try {
		const { username, password } = req.user;
		const NewUser = await User.findOne({
			username,
		});
		if (NewUser && NewUser["password"] == password) {
			res.status(201).json({
				username: NewUser.username,
				email: NewUser.email,
			});
		} else {
			res.status(401).json({
				message: "Invalid Credantials",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error ☹️",
		});
	}
};

const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ username });
		if (!existingUser) {
			const existingEmail = await User.findOne({ email });
			if (!existingEmail) {
				const NewUser = new User({ username, email, password });
				await NewUser.save();
				res.status(200).json({ message: "User added Successfully" });
				console.log("User added successfully!!\n", {
					username,
					email,
					password,
				});
			} else {
				res.status(400).json({
					message: "Please enter a unique email",
				});
			}
		} else {
			res.status(400).json({
				message: "Please enter a unique username",
			});
		}
	} catch (error) {
		console.error("Error adding new user: ", error);
		res.status(500).json({
			message: "Internal Server Error ☹️",
		});
	}
};

export { registerUser, loginUser, isLogged };
