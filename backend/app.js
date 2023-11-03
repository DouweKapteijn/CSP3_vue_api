const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 8080;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.listen(port,()=>(
    console.log('app listening on port ' + port)
))

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "csp3-customers"
});

con.connect(function (err) {
if (err) throw err;
    console.log("Database connected!");
});

// GET nested
app.get("/NestedReservationsData", (req, res) =>{
    con.query(
        "SELECT reservations.userid, customers.fname, customers.lname, reservations.startdate, reservations.enddate FROM reservations INNER JOIN customers ON reservations.userid = customers.id ORDER BY reservations.userid, customers.fname, customers.lname, reservations.startdate, reservations.enddate;"
        , (err, result, fields) => {
        if (err) {
            // Response if no result
            return res.status(500).json({ error: "An error occurred while getting data." });
        }

        const nestedJSONArr = [];

        result.forEach((row) => {
            const { userid, fname, lname, startdate, enddate } = row;

            const nestedJSON = {
                userid,
                name:{
                    fname,
                    lname
                },
                dates:{
                    startdate,
                    enddate
                }
            }
            nestedJSONArr.push(nestedJSON);
        });
        // Response if handled correctly
        res.status(200).json({ message: nestedJSONArr });
    });
});

// GET reservations endpoint
app.get("/ReservationsData", (req, res) => {
    con.query("SELECT * FROM reservations", (err, result, fields) => {
        if (err) {
            // Response if no result
            return res.status(500).json({ error: "An error occurred while getting data." });
        }
        // Response if handled correctly
        res.status(200).json({ message: result });
    });
});

// POST reservations endpoint
app.post('/ReservationsData', (req, res) => {
    const { userid, startdate, enddate } = req.body;
  
    const sql = 'INSERT INTO reservations (userid, startdate, enddate) VALUES (?, ?, ?)';
    con.query(sql, [userid, startdate, enddate], (err, result) => {
        if (err) {
            // Response if no result
            res.status(500).json({ error: 'An error occurred while adding the row.' });
        } else {
            // Response if handled correctly
            res.status(201).json({ message: 'Item added successfully' });
        }
    });
});

// PUT reservations endpoint
app.put('/ReservationsData', (req, res) => {
    const { id, userid, startdate, enddate } = req.body;

    if (!id) {
        // Response if no id was entered
        return res.status(400).json({ error: 'ID is needed to update.' });
    }

    const sql = 'UPDATE reservations SET userid=?, startdate=?, enddate=? WHERE id=?';
    con.query(sql, [userid, startdate, enddate, id], (err, result) => {
        if (err) {
            // Response if no result
            res.status(500).json({ error: 'An error occurred while updating the row.' });
        } else {
            if (result.affectedRows === 0) {
                // Response if there is no such id
                res.status(404).json({ error: 'No row of that ID.' });
            } else {
                // Response if handled correctly
                res.status(200).json({ message: 'Row updated successfully' });
            }
        }
    });
});


// PATCH reservations endpoint
app.patch('/ReservationsData', (req, res) => {
    const { id, userid, startdate, enddate } = req.body;

    if (!id) {
        // Response if no id was entered
        return res.status(400).json({ error: 'ID is needed to update.' });
    }

    // Checks which fields are filled in
    let updateFields = [];
    let placeholders = [];

    if (userid !== undefined) {
        updateFields.push('userid=?');
        placeholders.push(userid);
    }
    if (startdate !== undefined) {
        updateFields.push('startdate=?');
        placeholders.push(startdate);
    }
    if (enddate !== undefined) {
        updateFields.push('enddate=?');
        placeholders.push(enddate);
    }

    if (updateFields.length === 0) {
        // Checks if at least 1 field is filled  
        return res.status(400).json({ error: 'No items to update.' });
    }

    const sql = `UPDATE reservations SET ${updateFields.join(', ')} WHERE id=?`;
    placeholders.push(id);

    con.query(sql, placeholders, (err, result) => {
        if (err) {
            // Response if no result
            res.status(500).json({ error: 'An error occurred while updating the item(s).' });
        } else {
            if (result.affectedRows === 0) {
                // Response if there is no such id
                res.status(404).json({ error: 'No item of that ID.' });
            } else {
                // Response if handled correctly
                res.status(200).json({ message: 'Item(s) updated successfully' });
            }
        }
    });
});

// DELETE reservations endpoint
app.delete('/ReservationsData', (req, res) => {
    const { id } = req.body;

    if (!id) {
        // Response if no id was entered
        return res.status(400).json({ error: 'ID is needed to update.' });
    }

    const sql = 'DELETE FROM reservations WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            // Response if no result
            res.status(500).json({ error: 'An error occurred while deleting the row.' });
        } else {
            if (result.affectedRows === 0) {
                // Response if there is no such id
                res.status(404).json({ error: 'No row of that ID.' });
            } else {
                // Response if handled correctly
                res.status(200).json({ message: 'Row deleted successfully' });
            }
        }
    });
});

// GET customers endpoint
app.get("/CustomersData", (req, res) => {
    con.query("SELECT * FROM customers", (err, result, fields) => {
        if (err) {
            // Response if no result
            return res.status(500).json({ error: "An error occurred while getting data." });
        }
        // Response if handled correctly
        res.status(200).json({ message: result });
    });
});

app.post('/CustomersData', (req, res) => {
    const { fname, lname, uname, userrole, password } = req.body;

    const sql = 'INSERT INTO customers (fname, lname, uname, userrole, password) VALUES (?, ?, ?, ?, ?)';
    con.query(sql, [fname, lname, uname, userrole, password], (err, result) => {
        if (err) {
            // Response if there's an error
            res.status(500).json({ error: 'An error occurred while adding the row.' });
        } else {
            // Response if handled correctly
            res.status(201).json({ message: 'Item added successfully' });
        }
    });
});


app.put('/CustomersData', (req, res) => {
    const { id, fname, lname, uname, userrole, password } = req.body;

    if (!id) {
        // Response if no id was entered
        return res.status(400).json({ error: 'ID is needed to update.' });
    }

    const sql = 'UPDATE customers SET fname=?, lname=?, uname=?, userrole=?, password=? WHERE id=?';
    con.query(sql, [fname, lname, uname, userrole, password, id], (err, result) => {
        if (err) {
            // Response if no result
            res.status(500).json({ error: 'An error occurred while updating the row.' });
        } else {
            if (result.affectedRows === 0) {
                // Response if there is no such id
                res.status(404).json({ error: 'No row of that ID.' });
            } else {
                // Response if handled correctly
                res.status(200).json({ message: 'Row updated successfully' });
            }
        }
    });
});



app.patch('/CustomersData', (req, res) => {
    const { id, fname, lname, uname, userrole, password } = req.body;

    if (!id) {
        // Response if no id was entered
        return res.status(400).json({ error: 'ID is needed to update.' });
    }

    // Checks which fields are filled in
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
        // Checks if at least 1 field is filled
        return res.status(400).json({ error: 'No items to update.' });
    }

    const sql = `UPDATE customers SET ${updateFields.join(', ')} WHERE id=?`;
    placeholders.push(id);

    con.query(sql, placeholders, (err, result) => {
        if (err) {
            // Response if no result
            res.status(500).json({ error: 'An error occurred while updating the item(s).' });
        } else {
            if (result.affectedRows === 0) {
                // Response if there is no such id
                res.status(404).json({ error: 'No item of that ID.' });
            } else {
                // Response if handled correctly
                res.status(200).json({ message: 'Item(s) updated successfully' });
            }
        }
    });
});

// DELETE customer and their reservations
app.delete('/CustomersData', (req, res) => {
    const { id } = req.body;

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