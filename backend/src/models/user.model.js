import crypto from "crypto";
import bcrypt from "bcrypt"
import mongoose from "mongoose";

// const hashPassword = (password) => {
//     const salt = crypto.randomBytes(16).toString("hex");
//     const hash = crypto.scryptSync(password, salt, 64).toString("hex");

//     return `${salt}:${hash}`;
// };

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true,"Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true,"Password is required"],
            minlength: 8,
            select: false,
        },
        role: {
            type: String,
            enum: ["user","admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function (next) {
    
    if (!this.isModified("password")) return; 

    this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.pre("save", function hashUserPassword(next) {
//     if (!this.isModified("password")) {
//         return next();
//     }

//     this.password = hashPassword(this.password);
//     return next();
// });

// userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
//     const [salt, storedHash] = this.password.split(":");

//     if (!salt || !storedHash) {
//         return false;
//     }

//     const candidateHash = crypto.scryptSync(candidatePassword, salt, 64);
//     const storedBuffer = Buffer.from(storedHash, "hex");

//     if (candidateHash.length !== storedBuffer.length) {
//         return false;
//     }

//     return crypto.timingSafeEqual(candidateHash, storedBuffer);
// };

const User = mongoose.model("User", userSchema);

export default User;
