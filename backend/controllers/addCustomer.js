const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csp3-customers"
});

router.post('/', (req, res) => {
    const { fname, lname, uname, userrole, password } = req.body;
    const sql = 'INSERT INTO customers (fname, lname, uname, userrole, password) VALUES (?, ?, ?, ?, ?)';
    con.query(sql, [fname, lname, uname, userrole, password], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred while adding the row.' });
        } else {
            res.status(201).json({ message: 'Item added successfully' });
        }
    });
});

module.exports = router;
