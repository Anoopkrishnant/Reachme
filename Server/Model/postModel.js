import mongoose from "mongoose";

const postSchema= new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: String,
    likes: [],
    image: String,
    video: String,
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;