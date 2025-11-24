// seed/seedAdmin.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const number = "9999999999"; // 👈 your default admin number
    const password = "admin123"; // 👈 your default admin password

    // Check if already exists
    const existingAdmin = await User.findOne({ number });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      number,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user seeded successfully!");
    console.log(`📱 Number: ${number}`);
    console.log(`🔑 Password: ${password}`);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
