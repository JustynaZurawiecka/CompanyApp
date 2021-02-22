const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Department.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {

    try {
        const count = await Department.countDocuments(); //first we count all documents in the collection
        const rand = Math.floor(Math.random() * count); //then we draw(losowac) a number which is lower tan the number of all documents
        const dep = await Department.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.getOne = async (req, res) => {

    try {
        const dep = await Department.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.insertOne = async (req, res) => {

    try {

        const { name } = req.body;  //get name parametr from req.body
        const newDepartment = new Department({ name: name });   //create a new document based on Department model
        await newDepartment.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }

};

//or to use Promise

// exports.insertOne = (req, res) => {

//   const { name } = req.body;
//   const newDepartment = new Department({ name });
//   newDepartment.save()
//     .then(() => {
//       res.json({ message: 'OK' });
//     })
//     .catch(err => {
//       res.status(500).json({ message: err });
//     });

// };

exports.updateOne = async (req, res) => {
    const { name } = req.body;

    try {
        const dep = await (Department.findById(req.params.id));
        //below we check if element with the id from request exists and if yes server returns it and if not returns 404 Not found
        if (dep) {
            await Department.updateOne({ _id: req.params.id }, { $set: { name: name } });
            res.json({ message: 'OK' });
            res.json(dep);
        }
        else res.status(404).json({ message: err });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.deleteOne = async (req, res) => {

    try {
        const dep = await Department.findById(req.params.id);
        if (dep) {
            await Department.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
            res.json(dep)
        }
        else res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};