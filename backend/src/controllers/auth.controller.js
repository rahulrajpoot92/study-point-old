import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import buildUserResponse from "../utils/userResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(
            400,
            "Name, email and password are required",
            [],
            "VALIDATION_ERROR"
        );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists",
            [],
            "USER_ALREADY_EXISTS"
        );
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            buildUserResponse(user),
            "User registered successfully"
        )
    );

});

export {
    registerUser
};

















































//   try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 message: "Name, email, and password are required",
//             });
//         }

//         const normalizedEmail = email.trim().toLowerCase();
//         const existingUser = await User.findOne({ email: normalizedEmail });

//         if (existingUser) {
//             return res.status(409).json({
//                 message: "User already exists",
//             });
//         }

//         const user = await User.create({
//             name: name.trim(),
//             email: normalizedEmail,
//             password,
//         });

//         return res.status(201).json({
//             message: "User registered successfully",
//             user: buildUserResponse(user),
//         });

//     } catch (error) {
//         if (error.name === "ValidationError") {
//             const messages = Object.values(error.errors).map((item) => item.message);

//             return res.status(400).json({
//                 message: messages.join(", "),
//             });
//         }

//         if (error.code === 11000) {
//             return res.status(409).json({
//                 message: "User already exists",
//             });
//         }

//         return res.status(500).json({
//             message: "Failed to register user",
//         });

//     }