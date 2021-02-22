const Employee = require('../models/employee.model');


exports.getAll = async (req, res) => {
    try {
        res.json(await Employee.find().populate('department'));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {

    try {
        const count = await Employee.countDocuments(); //first we count all documents in the collection
        const rand = Math.floor(Math.random() * count); //then we draw(losowac) a number which is lower tan the number of all documents
        const emp = await Employee.findOne().populate('department').skip(rand);
        if (!emp) res.status(404).json({ message: 'Not found' });
        else res.json(emp);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.getOne = async (req, res) => {

    try {
        const emp = await Employee.findById(req.params.id).populate('department');
        if (!emp) res.status(404).json({ message: 'Not found' });
        else res.json(emp);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.updateOne = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    try {
        const emp = await (Employee.findById(req.params.id));
        //below we check if element with the id from request exists and if yes server returns it and if not returns 404 Not found
        if (emp) {
            await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department } });
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
        const emp = await Employee.findById(req.params.id);
        if (emp) {
            await Employee.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};
