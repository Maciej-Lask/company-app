const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand);
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
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
});

router.put('/employees/:id', async (req, res) => {
  try {
    const { firstName, lastName, department, salary } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, department, salary },
      { new: true }
    );
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;

// const express = require('express');
// const ObjectId = require('mongodb').ObjectId;
// const router = express.Router();

// router.get('/employees', (req, res) => {
//   req.db
//     .collection('employees')
//     .find()
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data);
//     });
// });

// router.get('/employees/random', (req, res) => {
//   req.db
//     .collection('employees')
//     .aggregate([{ $sample: { size: 1 } }])
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data[0]);
//     });
// });

// router.get('/employees/:id', (req, res) => {
//   req.db
//     .collection('employees')
//     .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else if (!data) res.status(404).json({ message: 'Not found' });
//       else res.json(data);
//     });
// });

// router.post('/employees', (req, res) => {
//   const { firstName, lastName, department, salary } = req.body;
//   req.db.collection('employees').insertOne(
//     {
//       firstName: firstName,
//       lastName: lastName,
//       department: department,
//       salary: salary,
//     },
//     (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     }
//   );
// });

// router.put('/employees/:id', (req, res) => {
//   const { firstName, lastName, department, salary } = req.body;
//   req.db.collection('employees').updateOne(
//     { _id: ObjectId(req.params.id) },
//     {
//       $set: {
//         firstName: firstName,
//         lastName: lastName,
//         department: department,
//         salary: salary,
//       },
//     },
//     (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     }
//   );
// });

// router.delete('/employees/:id', (req, res) => {
//   req.db
//     .collection('employees')
//     .deleteOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     });
// });

// module.exports = router;
