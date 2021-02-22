const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Product.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {

    try {
        const count = await Product.countDocuments(); //first we count all documents in the collection
        const rand = Math.floor(Math.random() * count); //then we draw(losowac) a number which is lower tan the number of all documents
        const prod = await Product.findOne().skip(rand);
        if (!prod) res.status(404).json({ message: 'Not found' });
        else res.json(prod);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.getOne = async (req, res) => {

    try {
        const prod = await Product.findById(req.params.id);
        if (!prod) res.status(404).json({ message: 'Not found' });
        else res.json(prod);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};


exports.insertOne = async (req, res) => {

    try {

        const { name, client } = req.body;  //get name parametr from req.body
        const newProduct = new Product({ name: name, client: client });   //create a new document based on Product model
        await newProduct.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.updateOne = async (req, res) => {
    const { name, client } = req.body;

    try {
        const prod = await (Product.findById(req.params.id));
        //below we check if element with the id from request exists and if yes server returns it and if not returns 404 Not found
        if (prod) {
            await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client } });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: err });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.deleteOne = async (req, res) => {

    try {
        const prod = await Product.findById(req.params.id);
        if (prod) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};
