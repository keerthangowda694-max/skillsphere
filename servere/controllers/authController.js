const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// ============================================
// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
// ============================================

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, role } = req.body;

    // Validation
    if (!fullName || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create User
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role,
        isVerified: false,
        verificationToken,
        verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Verification Link
    const verificationURL = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

    // Send Verification Email
    await sendEmail(
        user.email,
        "Verify Your SkillSphere Account",
        `
        <h2>Welcome to SkillSphere 🎉</h2>

        <p>Thank you for registering.</p>

        <p>Please click the button below to verify your email.</p>

        <a href="${verificationURL}"
        style="
        background:#2563eb;
        color:white;
        padding:12px 20px;
        text-decoration:none;
        border-radius:6px;
        display:inline-block;">
        Verify Email
        </a>

        <p>This verification link expires in 24 hours.</p>
        `
    );

    res.status(201).json({
        message: "Registration successful. Please verify your email.",
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
    });
});

// ============================================
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
// ============================================

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // Check if account is suspended
    if (user.isSuspended) {
        return res.status(403).json({
            success: false,
            message: "Your account has been suspended by the administrator.",
        });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // Check Email Verification
    if (!user.isVerified) {
        res.status(403);
        throw new Error("Please verify your email before logging in.");
    }

    // Login Success
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
    });

});

// ============================================
// @desc    Verify Email
// @route   GET /api/auth/verify-email/:token
// @access  Public
// ============================================

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired verification token.");
    }

    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Email verified successfully. You can now log in.",
    });
});

// ============================================
// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
// ============================================

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    const resetURL = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    await sendEmail(
        user.email,
        "SkillSphere Password Reset",
        `
        <h2>Password Reset Request</h2>

        <p>You requested to reset your password.</p>

        <a href="${resetURL}"
        style="
        background:#dc2626;
        color:white;
        padding:12px 20px;
        text-decoration:none;
        border-radius:6px;">
        Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>
        `
    );

    res.status(200).json({
        success: true,
        message: "Password reset email sent successfully."
    });
});

// ============================================
// @desc    Reset Password
// @route   POST /api/auth/reset-password/:token
// @access  Public
// ============================================

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired reset token");
    }

    // Hash New Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = "";
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password reset successfully. Please login."
    });
});

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
};