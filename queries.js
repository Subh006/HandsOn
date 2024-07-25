const {Client} = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'Subhajeet Mohanty',
  user: 'postgres',
  password: '12345',
  port: 5432,
})

client.connect();

const getEmployees = (req, res) => {
  client.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('SELECT * FROM employees WHERE eid = $1', [id], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

const createEmployee = (req, res) => {
  const {ename, salary, dept} = req.body

  client.query('INSERT INTO employees (ename,salary,dept) VALUES($1, $2, $3)', [ename, salary, dept], (err, results) => {
    if (err) {
      throw err
    }
    res.status(201).send(`Employee added successfully`)
  })
}

const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id)
  const {ename, salary,dept } = req.body

  client.query(
    'UPDATE employees SET ename= $1, salary = $2, dept= $3 WHERE eid = $4',
    [ename, salary,dept, id],
    (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).send(`Employee updated successfully`)
    }
  )
}

const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('DELETE FROM employees WHERE eid = $1', [id], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).send(`Employee deleted`)
  })
}

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}