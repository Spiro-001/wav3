import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username already exists!"],
    match: [
      /^[a-zA-Z0-9.\-_$@*!]{3,25}$/,
      "Username invalid, it should contain 3-25 alphanumeric letters and be unique!",
    ],
    lowercase: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  password_digest: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
