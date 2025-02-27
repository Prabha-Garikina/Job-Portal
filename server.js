const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use(express.json()); // Allows JSON requests

const SECRET_KEY =
  "5dd274c2ee7455ae3a3327e81a16f13a96368e203973234109d5788cec3233db";

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // Change this to your MySQL password
  database: "hirehub",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database.");
});

//API TO Signup Users
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if email already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
          return res.status(400).json({ error: "Email already registered" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (err, result) => {
            if (err)
              return res.status(500).json({ error: "Error saving user" });

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// API to validate login

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login successful", token });
    }
  );
});

// API to fetch jobs based on search criteria
app.get("/api/jobs", (req, res) => {
  let { title, location, company } = req.query;
  let query =
    "SELECT id, title, company, location, description, link FROM jobs WHERE 1=1";
  let values = [];

  if (title) {
    query += " AND title LIKE ?";
    values.push(`%${title}%`);
  }
  if (location) {
    query += " AND location LIKE ?";
    values.push(`%${location}%`);
  }
  if (company) {
    query += " AND company LIKE ?";
    values.push(`%${company}%`);
  }

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Database query error" });
      return;
    }
    res.json(results);
  });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
