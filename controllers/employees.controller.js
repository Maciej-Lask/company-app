const Employee = require('../models/employee.model');
const Department = require('../models/department.model');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomEmployee = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand).populate('department');
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      'department'
    );
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department, salary } = req.body;
    const newEmployee = new Employee({
      firstName,
      lastName,
      department,
      salary,
    });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
    const { firstName, lastName, department, salary } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, department, salary },
      { new: true }
    ).populate('department');
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id).populate(
      'department'
    );
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
