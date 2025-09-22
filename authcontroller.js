import { initDB } from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// function to registering the user 
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const db = await initDB(); 

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hash]
    );

    // user has been registered successfully
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
}


// function to login the user
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const db = await initDB();

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    // invalid email or password
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
}

