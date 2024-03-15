import express, { Router, response } from "express";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";
import { User } from "./src/models/user.models.js";
import { Post } from "./src/models/post.models.js";

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

		app.get("/api/posts", async (req, res) => {
			try {
				// let posts = await Post.find({});
				res.send(posts);
			} catch (error) {
				console.error(`Error fetching posts: ${error}`);
			}
		});
	})
	.catch((error) => {
		console.error(`Error connecting to the database ${error}`);
	});
