const Employee = require('../employee.model');
const Department = require('../department.model'); 
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  afterEach(async () => {
    await Employee.deleteMany();
    await Department.deleteMany();
  });

  describe('Reading data', () => {
    it('should return all the data with "find" method', async () => {
      const employee1 = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });
      await employee1.save();

      const employee2 = new Employee({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
      });
      await employee2.save();

      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.equal(expectedLength);
    });

    it('should return a proper document by various params with "findOne" method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });
      await employee.save();

      const foundByName = await Employee.findOne({ firstName: 'John' });
      expect(foundByName.firstName).to.equal('John');

      const foundByLastName = await Employee.findOne({ lastName: 'Doe' });
      expect(foundByLastName.lastName).to.equal('Doe');

      const foundByDepartment = await Employee.findOne({ department: 'Sales' });
      expect(foundByDepartment.department).to.equal('Sales');
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });

      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    it('should properly update one document with "updateOne" method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });
      await employee.save();

      await Employee.updateOne(
        { firstName: 'John' },
        { $set: { firstName: 'UpdatedJohn' } }
      );

      const updatedEmployee = await Employee.findOne({
        firstName: 'UpdatedJohn',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });
      await employee.save();

      employee.firstName = 'UpdatedJohn';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: 'UpdatedJohn',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      const employee1 = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });
      await employee1.save();

      const employee2 = new Employee({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
      });
      await employee2.save();

      await Employee.updateMany({}, { $set: { department: 'Updated' } });
      const updatedEmployees = await Employee.find({ department: 'Updated' });
      expect(updatedEmployees.length).to.equal(2);
    });
  });

  describe('Removing data', () => {
    it('should properly remove one document with "deleteOne" method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });
      await employee.save();

      await Employee.deleteOne({ firstName: 'John' });

      const deletedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(deletedEmployee).to.be.null;
    });

    // !!!
    // TypeError: department.remove is not a function
    // Zbyt nowa wersja mongoose
    // !!!
    // it('should properly remove one document with "remove" method', async () => {
    //   const employee = new Employee({
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     department: 'Sales',
    //   });
    //   await employee.save();

    //   await employee.remove();

    //   const removedEmployee = await Employee.findOne({ firstName: 'John' });
    //   expect(removedEmployee).to.be.null;
    // });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      const employee1 = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Sales',
      });
      await employee1.save();

      const employee2 = new Employee({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
      });
      await employee2.save();

      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.equal(0);
    });
  });
});
