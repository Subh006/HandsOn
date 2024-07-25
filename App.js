const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Product Database');
});

app.get('/employees', db.getEmployees)
app.get('/employees/:id', db.getEmployeeById)
app.post('/employees', db.createEmployee)
app.put('/employees/:id', db.updateEmployee)
app.delete('/employees/:id', db.deleteEmployee)

app.listen(6199, () => {
    console.log(`Server is running on http://localhost:6199`);
});