import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";

const updateLike = async (req, res) => {
	try {
		const { username, postId, liked } = req.body;
		if (!username || !postId) {
			return res.status(400).json({
				message: "Please fill all the fields",
			});
		} else {
			const user = await User.findOne({ username });
			console.log("postId: ", postId);
			const post = await Post.findById({ _id: postId });
			if (liked) {
				post.likes.push(user);
			} else {
				post.likes = post.likes.filter(
					(users) => username !== users.username
				);
			}
			await post.save({ validateBeforeSave: false });
			res.status(201).json({
				message: "Like updated successfully",
			});
		}
	} catch (error) {
		console.error("Error updating like: ", error);
		res.status(500).json({
			message: "Internal Server Error ☹️",
		});
	}
};

export default updateLike;
