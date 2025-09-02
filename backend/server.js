/* eslint-disable no-undef */
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test DB connection once at startup
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully");
  }
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "campus_connect_schools",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

// DB test route
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) {
      console.error("DB test failed:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, result: results[0].result });
  });
});

// API route for adding schools
app.post("/add-schools", upload.single("image"), (req, res) => {
  try {
    const { school_name, address, city, state, contact_number, email } = req.body;
    const imageURL = req.file?.path || req.file?.secure_url;

    if (!school_name || !address || !city || !state || !contact_number || !email || !imageURL) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const query =
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [school_name, address, city, state, contact_number, imageURL, email],
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ success: false, message: err.message });
        }
        res.json({
          success: true,
          message: "School added successfully",
          id: result.insertId,
          imageURL,
        });
      }
    );
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get all schools
app.get("/schools", (req, res) => {
  const query = "SELECT * FROM schools";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching schools:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: results });
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
