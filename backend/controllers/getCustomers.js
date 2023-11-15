const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csp3-customers"
});

router.get("/", (req, res) => {
    con.query("SELECT * FROM customers", (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred while getting data." });
        }
        res.status(200).json({ message: result });
    });
});

module.exports = router;
