const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const getCustomersController = require('./controllers/getCustomers');
const getCustomerByIdController = require('./controllers/getCustomerById');
const addCustomerController = require('./controllers/addCustomer');
const updateCustomerController = require('./controllers/updateCustomer');
const deleteCustomerController = require('./controllers/deleteCustomer');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/CustomersData', getCustomersController);
app.use('/CustomersData', getCustomerByIdController);
app.use('/CustomersData', addCustomerController);
app.use('/CustomersData', updateCustomerController);
app.use('/CustomersData', deleteCustomerController);

app.listen(port, () => (
    console.log('app listening on port ' + port)
));
