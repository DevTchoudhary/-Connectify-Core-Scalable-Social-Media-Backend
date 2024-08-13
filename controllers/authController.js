const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {CustomError}=require("../middlewares/error")

const registerController = async (req, res, next) => {
    try {
        const { password, username, email } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new CustomError("Username or email already exists!",400);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ ...req.body, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res,next) => {
    try {
        const { email, username, password } = req.body;
        const user = email 
            ? await User.findOne({ email })
            : await User.findOne({ username });

        if (!user) {
            throw new CustomError("User not found", 404);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new CustomError("Wrong Credentials!", 401);
        }

        const { password: _, ...data } = user._doc;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.cookie("token", token).status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json("user logged out successfully");
    } catch (error) {
        next(error);
    }
};

const refetchUserController = async (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if (err) {
            return next(new CustomError(err, 404));
        }
        try {
            const id = data._id;
            const user = await User.findOne({ _id: id });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    });
};

module.exports = {
    registerController,
    loginController,
    logoutController,
    refetchUserController,
};
