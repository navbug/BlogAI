import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  subtitle: {
    type: String,
    required: [true, "Subtitle is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
  paragraphs: {
    type: [String],
    required: [true, "Paragraphs are required!"],
  },
  keyphrases: {
    type: [String],
    required: [true, "Keyphrases are required!"],
  },
  images: {
    type: [String],
    required: [true, "Images are required!"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;