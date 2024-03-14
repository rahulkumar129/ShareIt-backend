import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.type.ObjectId,
			ref: "User",
		},
		image: {
			type: String,
			required: true,
			lowercase: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		comments: {
			type: Number,
			default: 0,
		},
		caption: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
