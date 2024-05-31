import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";

const uploadPost = async (req, res) => {
	try {
		const { username, postTitle, imageUrl, caption } = req.body;
		if (!username || !postTitle || !imageUrl) {
			return res.status(400).json({
				message: "Please fill all the fields",
			});
		} else {
			const user = await User.findOne({ username });
			const newPost = new Post({
				user,
				username,
				postTitle,
				image: imageUrl,
				caption,
			});
			await newPost.save();
			res.status(201).json({
				message: "Post uploaded successfully",
			});
		}
	} catch (error) {
		console.error("Error uploading post: ", error);
		res.status(500).json({
			message: "Internal Server Error ☹️",
		});
	}
};

export default uploadPost;
