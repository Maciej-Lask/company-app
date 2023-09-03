const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomProduct = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(rand);
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name, client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { name, client } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, client },
      { new: true }
    );
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
