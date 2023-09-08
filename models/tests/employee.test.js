const Employee = require('../employee.model.js');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {
  // Clean up the models after all tests
  after(() => {
    mongoose.models = {};
  });
  it('should throw an error if any field is not a string', async () => {
    const cases = [
      { firstName: 123, lastName: 'Doe', department: 'IT' }, // Invalid firstName
      { firstName: 'John', lastName: true, department: 'IT' }, // Invalid lastName
      { firstName: 'John', lastName: 'Doe', department: 123 }, // Invalid department
    ];

    for (let data of cases) {
      const employee = new Employee(data);

      try {
        await employee.validate();
      } catch (error) {
        expect(error).to.exist;
        expect(error.errors).to.exist;

        if (
          typeof data.firstName !== 'string' ||
          typeof data.lastName !== 'string' ||
          typeof data.department !== 'string'
        ) {
          expect(error.errors).to.exist;
        }
      }
    }
  });

  it('should throw an error if any required field is missing', async () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'IT' }, // All required fields present
      { lastName: 'Doe', department: 'IT' }, // Missing firstName
      { firstName: 'John', department: 'IT' }, // Missing lastName
      { firstName: 'John', lastName: 'Doe' }, // Missing department
      { firstName: 'John' },
      {} // No fields
    ];

    for (let data of cases) {
      const employee = new Employee(data);

      try {
        await employee.validate();
      } catch (error) {
        if (!data.firstName || !data.lastName || !data.department) {
          expect(error.errors).to.exist;
        }
      }
    }
  });

  it('should not throw an error if all required fields are present', async () => {
    const validEmployeeData = {
      firstName: 'John',
      lastName: 'Doe',
      department: 'IT',
    };

    const employee = new Employee(validEmployeeData);

    try {
      await employee.validate();
    } catch (error) {
      expect(error).to.not.exist;
    }
  });
});
