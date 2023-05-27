import { Schema, model, models } from "mongoose";

const OAuthUserSchema = new Schema({
  id: {
    type: String,
    unique: [true, "ID already is registered!"],
    required: [true, "ID is required!"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  provider: {
    type: String,
    required: [true, "Provider is required!"],
  },
  wav3: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const OAuthUser = models.OAuthUser || model("OAuthUser", OAuthUserSchema);

export default OAuthUser;
