import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const activeTokens = auth.activeTokens;

const secretKey = process.env.JWT_SECRET || "aparna_kumari";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);
    activeTokens.set(user._id.toString(), token);

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (user) {
        activeTokens.delete(user.userId.toString());
      }
    });
  }

  res.json({ message: "Logged out successfully" });
};
