const express = require('express');

// const Department = require('../models/department.model');
const departmentController = require('../controllers/departments.controller'); 

const router = express.Router();


router.get('/departments', departmentController.getDepartments);

router.get('/departments/random', departmentController.getRandomDepartment);

router.get('/departments/:id', departmentController.getDepartmentById);

router.post('/departments', departmentController.createDepartment);

router.put('/departments/:id', departmentController.updateDepartmentById);

router.delete('/departments/:id', departmentController.deleteDepartmentById);

module.exports = router;