const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csp3-customers"
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const { fname, lname, uname, userrole, password } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is needed to update.' });
    }

    let updateFields = [];
    let placeholders = [];

    if (fname !== undefined) {
        updateFields.push('fname=?');
        placeholders.push(fname);
    }
    if (lname !== undefined) {
        updateFields.push('lname=?');
        placeholders.push(lname);
    }
    if (uname !== undefined) {
        updateFields.push('uname=?');
        placeholders.push(uname);
    }
    if (userrole !== undefined) {
        updateFields.push('userrole=?');
        placeholders.push(userrole);
    }
    if (password !== undefined) {
        updateFields.push('password=?');
        placeholders.push(password);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No items to update.' });
    }

    const sql = `UPDATE customers SET ${updateFields.join(', ')} WHERE id=?`;
    placeholders.push(id);

    con.query(sql, placeholders, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred while updating the item(s).' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'No item of that ID.' });
            } else {
                res.status(200).json({ message: 'Item(s) updated successfully' });
            }
        }
    });
});

module.exports = router;
