Zainstalowanie paczek z package.json(sciagniecie wszystkich zaleznosci)
yarn install

Pobieramy paczke mongodb 
yarn add mongodb@3.3.2

Import w server.js
const mongoClient = require('mongodb').MongoClient;

Przykladowe operacje na bazie danych 

   db.collection('employees').find({ department: 'IT' }, (err, data) => {
      if (!err) {
        data.each((err, employee) => {
          console.log(employee);
        })
      }
    });

    //Convert data returned by Cursor to an array
    db.collection('departments').find().toArray((err, data) => {
      if (!err) {
        console.log(data)
      }
    });

    db.collection('departments').insertOne({ name: 'Management' }, err => {
      if (err) console.log('err');
    });

    db.collection('employees').updateOne({ department: 'IT' }, { $set: { salary: 6000 } }, err => {
      if (err) console.log(err);
    });

    db.collection('departments').deleteOne({ name: 'Management' }, (err) => {
      if (err) console.log(err);
    });

USe mongodb compas

sudo systemctl start mongod
connect to mongodb db using mongodb compas