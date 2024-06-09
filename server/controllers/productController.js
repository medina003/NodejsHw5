
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
};
