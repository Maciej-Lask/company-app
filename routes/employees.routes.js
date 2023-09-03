const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employees.controller'); 

router.get('/employees', employeeController.getEmployees);

router.get('/employees/random', employeeController.getRandomEmployee);

router.get('/employees/:id', employeeController.getEmployeeById);

router.post('/employees', employeeController.createEmployee);

router.put('/employees/:id', employeeController.updateEmployeeById);

router.delete('/employees/:id', employeeController.deleteEmployeeById);

module.exports = router;
