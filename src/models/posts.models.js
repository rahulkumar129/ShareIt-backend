import mongoose from "mongoose";

const postsSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.type.ObjectId,
			ref: "User",
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
	},
	{ timestamps: true }
);

export const Posts = mongoose.model("Posts", postsSchema);
