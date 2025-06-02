import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Note: Store hashed passwords in production
  role: { type: String, enum: ["admin", "user"] },
});

const User = mongoose.model("User", userSchema);
export default User;
