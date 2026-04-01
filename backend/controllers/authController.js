// backend/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "mysecret", {
    expiresIn: "7d",
  });
};

// 🆕 Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, address });
    const token = generateToken(user._id);

    res.status(201).json({
      message: "✅ Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// 🔐 Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    res.json({
      message: "✅ Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
