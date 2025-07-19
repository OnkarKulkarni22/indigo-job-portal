const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'indigo'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// API route to save form data
app.post('/api/sample-request', (req, res) => {
  const { name, email, college } = req.body;

  const sql = 'INSERT INTO samples (name, email, college) VALUES (?, ?, ?)';
  db.query(sql, [name, email, college], (err, result) => {
    if (err) {
      console.error('❌ Error inserting:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Form submitted successfully!' });
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
