const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(rand);
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name, client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, client } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, client },
      { new: true }
    );
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;

// const express = require('express');
// const ObjectId = require('mongodb').ObjectId;
// const router = express.Router();

// router.get('/products', (req, res) => {
//   req.db
//     .collection('products')
//     .find()
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data);
//     });
// });

// router.get('/products/random', (req, res) => {
//   req.db
//     .collection('products')
//     .aggregate([{ $sample: { size: 1 } }])
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data[0]);
//     });
// });

// router.get('/products/:id', (req, res) => {
//   req.db
//     .collection('products')
//     .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else if (!data) res.status(404).json({ message: 'Not found' });
//       else res.json(data);
//     });
// });

// router.post('/products', (req, res) => {
//   const { name, client } = req.body;
//   req.db
//     .collection('products')
//     .insertOne({ name: name, client: client }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     });
// });

// router.put('/products/:id', (req, res) => {
//   const { name, client } = req.body;
//   req.db
//     .collection('products')
//     .updateOne(
//       { _id: ObjectId(req.params.id) },
//       { $set: { name: name, client: client } },
//       (err, data) => {
//         if (err) res.status(500).json({ message: err });
//         else res.json({ message: 'OK' });
//       }
//     );
// });

// router.delete('/products/:id', (req, res) => {
//   req.db
//     .collection('products')
//     .deleteOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     });
// });

// module.exports = router;
