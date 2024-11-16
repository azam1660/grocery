import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure the email is unique
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "delivery", "customer"], // Specify allowed roles
      default: "customer", // Default to 'customer' if no role is provided
    },
  },
  { timestamps: true }
);

// Create and export the model
const User = mongoose.model("User", userSchema);

export default User;
