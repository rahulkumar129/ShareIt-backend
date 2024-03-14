import express, { Router, response } from "express";
import connectDB from "./db/index.js";
import app from "./app.js";
import { User } from "./models/user.models.js";

const posts = [
	{
		user: "rahul",
		image: "https://images.pexels.com/photos/20344348/pexels-photo-20344348/free-photo-of-farmers-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		caption: "Caption for Rahul's post",
	},
	{
		user: "johnbanegadon",
		image: "https://images.pexels.com/photos/20344348/pexels-photo-20344348/free-photo-of-farmers-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		caption: "Caption for Johnbanegadon's post",
	},
	{
		user: "emma",
		image: "https://images.pexels.com/photos/20344348/pexels-photo-20344348/free-photo-of-farmers-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		caption: "Caption for Emma's post",
	},
];

connectDB()
	.then(() => {
		app.on("error", (error) => {
			console.error(`Error in the app: ${error}`);
		});
		app.listen(process.env.PORT || 4000, () => {
			console.log(`App listening on port ${process.env.PORT || 4000}`);
		});

		app.get("/", (req, res) => {
			res.send("The backend is successfully running");
		});

		app.post("/auth/signup", (req, res) => {
			const { uname, email, psw } = req.body;
			(async () => {
				try {
					const existingUser = await User.findOne({
						username: uname,
					});
					const existingEmail = await User.findOne({ email: email });

					if (!existingUser && !existingEmail) {
						const newUser = new User({
							username: uname,
							email: email,
							password: psw,
						});
						console.log(newUser._id);
						await newUser.save();
						console.log("User added successfully!!\n", {
							uname,
							email,
							psw,
						});
						res.redirect("/");
					} else {
						// res.send("Please enter a unique username or email !!");
						res.status(200).json({
							message:
								"Please enter a unique username or email !!",
						});
					}
					res.status(200).json({ msg: "all good" });
				} catch (error) {
					console.error("Error adding user: ", error);
					res.send("Internal Server Error ☹️");
				}
			})();
		});

		app.get("/api/posts", (req, res) => {
			res.send(posts);
		});
	})
	.catch((error) => {
		console.error(`Error connecting to the database ${error}`);
	});

// console.log(await User.findOne()["_id"]);
