const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "indigo"
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to DB:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

app.post("/api/sample-request", (req, res) => {
  const { name, email, college } = req.body;
  const sql = "INSERT INTO samples (name, email, college) VALUES (?, ?, ?)";
  db.query(sql, [name, email, college], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Sample request submitted successfully!" });
  });
});

app.get("/api/submissions", (req, res) => {
  db.query("SELECT * FROM samples ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Retrieve error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
