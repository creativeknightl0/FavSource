const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Actress = require('./models/actress');
const fs = require('fs');
const util = require('util');
const multer = require('multer');

// without this, multer stores all files as file type not with no extensions like png, jpg etc meaning we have to download the file before seeing it so basically its unusable so storage setup with filename function is important to setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); // which folder to store it in
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName); // name of the file stored
    }
});

const upload = multer({storage});

mongoose.connect('mongodb://localhost:27017/actress-real-data')
    .then(() => {
        console.log('Mongoose connected to mongodb successfuly :)');
    })
    .catch(e => {
        console.log('The connection between mongoose and mongodb failed :( ', e);
    })

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const favActresses = {
    1: {
        name: 'Leila George',
        imgSrc: '/images/leila-george.jpg',
        firstSaw: 'Disclaimer'
    },
    2: {
        name: 'Jessica Brown Findlay',
        imgSrc: '/images/jessica-brown-findlay.jpg',
        firstSaw: 'Brave New World'
    },
    3: {
        name: 'Sophia Myles',
        imgSrc: '/images/sophia-myles.jpg',
        firstSaw: 'Hallam Foe'
    }
};

// fake db for json data sending (duplicate of above favActresses - object of ojects)
const actresses = {
    "1": {
        "name": "Leila George",
        "imgSrc": "http://localhost:3000/images/leila-george.jpg",
        "firstSaw": "Disclaimer"
    },
    "2": {
        "name": "Jessica Brown Findlay",
        "imgSrc": "http://localhost:3000/images/jessica-brown-findlay.jpg",
        "firstSaw": "Brave New World"
    },
    "3": {
        "name": "Sophia Myles",
        "imgSrc": "http://localhost:3000/images/sophia-myles.jpg",
        "firstSaw": "Hallam Foe"
    }
}

app.get('/favActress/:id', (req, res) => {
    const { id } = req.params;
    const particularActress = favActresses[id];
    res.render('actress-page', { particularActress });
})

app.get('/actress/:id', (req, res) => {
    const {id} = req.params;
    res.send(actresses[id]);
})

app.post('/actress', upload.single('imgSrc'), (req, res) => {
    console.log(req.body);
    console.log(req.files);
})

// RESTful APIs - with real mongodb saved data

// GET /actresses - to see all the actresses on a page
app.get('/actresses', async(req, res) => {
    const showAllActresses = await Actress.find();
    console.log('Time to send it to frontend: ' + showAllActresses);
    res.send(showAllActresses);
})

// GET /actresses/:id - to see particular actress info
app.get('/actresses/:id', async(req, res) => {
    const {id} = req.params;
    const particularActress = await Actress.findById(id);
    res.send(particularActress);
})

// POST /actresses - to create new actress record
app.post('/actresses', upload.single('imgSrc'), async(req, res) => {
    console.log('Hitted server-side');
    console.log(req.file);
    const {name, firstSaw} = req.body;
    // console.log(util.inspect(imgSrc, {showHidden: false, depth: null, colors: true}));
    // const folderName = 'public/images';
    // fs.writeFileSync(`${folderName}/${imgSrc}`, '');
    // const imgSrc = `http://localhost:3000/images/${req.file.filename}`; // store the path of the image stored on express server hosted
    
    // as image is stored by multer already in the folder for showing prupose on backend side - so we will collect the correct path on which image is hosted and then store it in mongodb
    const imagePath = `http://localhost:3000/images/${req.file.originalname}`;

    // instantiate the model with new data we have
    const newActressRecord = new Actress({name, imgSrc: imagePath, firstSaw});
    // // save in mongoddb
    newActressRecord.save()
        .then(d => {
            console.log('Data is saved in mongodb successfully: ' + d);
        })
        .catch(e => {
            console.log('Error occurred while saving data on mongodb: ' + e);
        })
    res.redirect('http://localhost:5173/actresses');
})

app.listen(3000, () => {
    console.log('Backend listening on port 3000');
})