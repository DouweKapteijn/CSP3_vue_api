const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csp3-customers"
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'Customer ID is required in the request body.' });
    }

    const sql = 'DELETE FROM customers WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred while deleting the customer and their reservations.' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'No customer of that ID.' });
            } else {
                res.status(200).json({ message: 'Customer and their reservations deleted successfully' });
            }
        }
    });
});

module.exports = router;