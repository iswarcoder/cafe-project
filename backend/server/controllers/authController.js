import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken({ id: user._id, role: user.role });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      userId: user._id,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, identifier, password } = req.body;
    const rawIdentifier = (identifier || email || "").trim();

    if (!rawIdentifier || !password) {
      return res.status(400).json({ message: "Email/User ID and password are required" });
    }

    const isObjectId = /^[a-fA-F0-9]{24}$/.test(rawIdentifier);
    const isEmail = /^\S+@\S+\.\S+$/.test(rawIdentifier);

    let query;
    if (isObjectId) {
      query = { _id: rawIdentifier };
    } else if (isEmail) {
      query = { email: rawIdentifier.toLowerCase() };
    } else {
      query = { name: rawIdentifier };
    }

    const user = await User.findOne(query).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user._id, role: user.role });

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    next(error);
  }
};
