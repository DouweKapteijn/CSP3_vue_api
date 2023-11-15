const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csp3-customers"
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM customers WHERE id = ?';
    con.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred while fetching user data.' });
        } else {
            res.status(200).json({ message: result });
        }
    });
});

module.exports = router;
