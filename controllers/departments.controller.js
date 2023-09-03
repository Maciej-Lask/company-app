const Department = require('../models/department.model');


exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomDepartment = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const department = await Department.findOne().skip(rand);
    if (!department) res.status(404).json({ message: 'Not found' });
    else res.json(department);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) res.status(404).json({ message: 'Not found' });
    else res.json(department);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateDepartmentById = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!department) res.status(404).json({ message: 'Not found' });
    else res.json(department);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) res.status(404).json({ message: 'Not found' });
    else res.json(department);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
