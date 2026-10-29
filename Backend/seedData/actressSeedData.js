const mongoose = require('mongoose');
const Actress = require('../models/actress');

mongoose.connect('mongodb://localhost:27017/actress-real-data')
    .then(() => {
        console.log('Mongoose is connected to Mongodb successfully :)');
    })
    .catch((e) => {
        console.log('Failed connection between mongoose and mongodb :( ' + e);
    })

// instantiate the imported model with new data to add-on
const addActress = new Actress({name: 'Leila George', imgSrc: 'http://localhost:3000/images/leila-george.jpg', firstSaw: 'Disclaimer'});
// addActress.save()
//     .then(d => {
//         console.log('Data was successfully saved to mongodb: ', d);
//     })
//     .catch(e => {
//         console.log('Error while data saving to mongodb: ' + e);
//     })

const moreActresses = [
    {
        name: 'Jessica Brown Findlay',
        imgSrc: 'http://localhost:3000/images/jessica-brown-findlay.jpg',
        firstSaw: 'Brave New World'
    },
    {
        name: 'Sophia Myles',
        imgSrc: 'http://localhost:3000/images/sophia-myles.jpg',
        firstSaw: 'Hallam Foe'
    }
];

// insert many in mongodb at once now using model
Actress.insertMany(moreActresses)
    .then(data => {
        console.log('More actresses inserted in mongodb successfully: ' + data);
    })
    .catch(e => {
        console.log('There was an error that occured while inserting it in database: ' + e);
    })