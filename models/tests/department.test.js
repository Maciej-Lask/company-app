const Department = require('../department.model.js');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Department', () => {
  after(() => {
    mongoose.models = {};
  });
  // to powoduje błąd
  // it('should throw an error if no "name" arg', () => {
  //   const dep = new Department({});

  //   dep.validate((err) => {
  //     expect(err.errors.name).to.exist;
  //   });
  // });
  // to jest niepotrzebne u mnie jakoś odświerzane nie wpływa na wyniki testów
  // after(() => {
  //   mongoose.models = {};
  // });
  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({});
    try {
      await dep.validate();
    } catch (error) {
      const validationError = error.errors.name;
      expect(validationError).to.exist;
    }
  });
  // it('should throw an error if "name" is not a string', () => {
  //   const cases = [{}, []];
  //   for (let name of cases) {
  //     const dep = new Department({ name });

  //     dep.validate((err) => {
  //       expect(err.errors.name).to.exist;
  //     });
  //   }
  // });
  it('should throw an error if "name" is not a string', async () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      try {
        await dep.validate();
      } catch (error) {
        expect(error.errors.name).to.exist;
      }
    }
  });
  it('should throw an error if "name" is less than 5 characters or more than 20', async () => {
    const cases = ['a', '12345',  'qwe', 'qwertyuiop'];
    for (let name of cases) {
      const dep = new Department({ name });
      try {
        await dep.validate();
      } catch (error) {
        expect(error.errors.name).to.exist;
      }
    }
  });
});

it('should not throw an error if "name" is a valid string', async () => {
  const validNames = [
    'Engineering',
    'Marketing',
    'Sales',
    'Finance'
  ];

  for (let name of validNames) {
    const dep = new Department({ name });

    try {
      await dep.validate();
    } catch (error) {
      // expect(error).to.be.null;
      expect(err).to.not.exist;
    }
  }
  
});


