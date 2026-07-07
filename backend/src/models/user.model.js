import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: [true,"Name is required"],
            trim: true,
        },
        email: {
            type: String,
            requried: [true,"Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true,"Password is required"],
            minlength: 8,
        },
        role: {
            type: String,
            enum: ["user","admin"],
            default: "user",
        },
    },
    {
        timesStamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;