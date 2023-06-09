import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  postOwnerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner ID is required!"],
  },
  doc: {
    type: String,
    required: [true, "Date of creation is required!"],
  },
  updatedAt: {
    type: String,
    required: [
      true,
      "Date updatedAt is required! default it to date of creation if this isn't a patch request.",
    ],
  },
  body: {
    type: String,
    required: [true, "Body is required!"],
    minLength: [1, "Body minimum length is 1!"],
    maxLength: [250, "Body exceeds maximum length of 250!"],
  },
  images: {
    type: [String],
    default: [],
  },
  video: {
    type: [String],
    default: [],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  comments: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  highlights: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
