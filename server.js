const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;
const app = express();

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

mongoClient.connect(
  'mongodb://0.0.0.0:27017',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully connected to the database');
      const db = client.db('companyDB');
      const app = express();

      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));


      app.use((req, res, next) => {
        req.db = db;
        next();
      });

      app.use('/api', employeesRoutes);
      app.use('/api', departmentsRoutes);
      app.use('/api', productsRoutes);
      
      app.use((req, res) => {
        res.status(404).send({ message: 'Not found...' });
      });
      
      app.listen('8000', () => {
        console.log('Server is running on port: 8000');
      });
    }
  }
  );
  
  // To nawet nie działa, chyba kwestia wersji MongoDB
  // db.collection('employees').find({ department: 'IT' }, (err, data) => {
  //   if (!err) console.log(data);
  // });

  // db.collection('employees')
  //   .find({ department: 'IT' })
  //   .toArray()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });