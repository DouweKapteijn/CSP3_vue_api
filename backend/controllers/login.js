const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const secretKey = require('./config');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "csp3-customers"
});

router.post('/', (req, res) => {
  const { uname, password } = req.body;

  const sql = 'SELECT * FROM customers WHERE uname = ? AND password = ?';
  con.query(sql, [uname, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        const token = jwt.sign({ uname: user.uname, role: user.userrole }, secretKey);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

module.exports = router;
