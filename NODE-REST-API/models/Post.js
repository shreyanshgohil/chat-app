import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userId: String,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
