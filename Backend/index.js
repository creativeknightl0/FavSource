const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Actress = require('./models/actress');
const fs = require('fs');
const multer = require('multer');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const favActresses = [
    {
        id: 1,
        name: 'Leila George',
        imgSrc: '/images/leila-george.jpg',
        firstSaw: 'Disclaimer'
    },
    {
        id: 2,
        name: 'Jessica Brown Findlay',
        imgSrc: '/images/jessica-brown-findlay.jpg',
        firstSaw: 'Brave New World'
    },
    {
        id: 3,
        name: 'Sophia Myles',
        imgSrc: '/images/sophia-myles.jpg',
        firstSaw: 'Hallam Foe'
    }
];

app.get('/favActress/:id', (req, res) => {
    const { id } = req.params;
    const particularActress = favActresses[id];
    res.render('actress-page', { particularActress });
})

// fake db for json data sending (duplicate of above favActresses - array of ojects)
const actresses = [
    {
        id: uuid(),
        name: "Leila George",
        imgSrc: "http://localhost:3000/images/leila-george.jpg",
        firstSaw: "Disclaimer"
    },
    {
        id: uuid(),
        name: "Jessica Brown Findlay",
        imgSrc: "http://localhost:3000/images/jessica-brown-findlay.jpg",
        firstSaw: "Brave New World"
    },
    {
        id: uuid(),
        name: "Sophia Myles",
        imgSrc: "http://localhost:3000/images/sophia-myles.jpg",
        firstSaw: "Hallam Foe"
    }
]

// GET /actress - show all the actress data
app.get('/actress', (req, res) => {
    res.send(actresses[0]);
})

// GET /actress/ids - show all the actress ids
app.get('/actress/ids', (req, res) => {
    let ids = [];
    for(const act of actresses) {
        ids.push(act.id);
    }
    res.send(ids);
})

// GET /actress/:id - show particular actress
app.get('/actress/:id', (req, res) => {
    const {id} = req.params;
    let partActress;
    for(const act of actresses) {
        if(act.id === id) {
            partActress = act;
        }
    }
    res.send(partActress);
})

// POST /actress - to create mew actress data
app.post('/actress', upload.single('imgSrc'), (req, res) => {
    const {name, firstSaw} = req.body;
    const imgSrcPath = `http://localhost:3000/images/${req.file.filename}`;
    actresses.push({id: uuid(), name: name, imgSrc: imgSrcPath, firstSaw: firstSaw});
    console.log(actresses);
    res.redirect(`http://localhost:5173/actress/${actresses[actresses.length - 1].id}`);
})

// UPDATE /actress/:id - to update particular actress
app.put('/actress/:id', upload.single('imgSrc'), (req, res) => {
    const {id} = req.params;
    const {name, firstSaw} = req.body;
    const remakePathForMongoDB = `http://localhost:3000/images/${req.file.originalname}`;
    for(let i = 0; i < actresses.length; i++) {
        if(actresses[i].id === id) {
            actresses.splice(i, 1, {id: id, name: name, imgSrc: remakePathForMongoDB, firstSaw: firstSaw}); // splice(start, deleteCount, items_to_be_added)
        }
    }
    console.log(actresses);
    res.redirect(`http://localhost:5173/actress/${id}`);
})

// DELETE /actress/:id - to delete the actress data
app.delete('/actress/:id', (req, res) => {
    const {id} = req.params;
    for(let i=0; i<actresses.length; i++) {
        if(actresses[i].id === id) {
            actresses.splice(i, 1);
        }
    }
    console.log(actresses);
    res.redirect('http://localhost:5173/actress');
})

// RESTful APIs - with real mongodb saved data

// GET /actresses - to see all the actresses on a page
app.get('/actresses', async(req, res) => {
    const showAllActresses = await Actress.find();
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
    // console.log('Hitted server-side');
    // console.log('req.body: ' + JSON.stringify(req.body)); // for multipart/form-data or FormData sent we have to stringify it to see the data otherwise it shows 'cannot convert object to primitive value' error
    const {name, firstSaw} = req.body;
    // console.log(name + ' ' + firstSaw);
    // as multer handles both reading file and uploading it to be able to read on backend so nodejs own tool fs is not needed
    // const folderName = 'public/images';
    // fs.writeFileSync(`${folderName}/${imgSrc}`, '');
    // const imgSrc = `http://localhost:3000/images/${req.file.filename}`; // store the path of the image stored on express server hosted
    
    // as image is stored by multer already in the folder for showing prupose on backend side - so we will collect the correct path on which image is hosted and then store it in mongodb
    const imagePath = `http://localhost:3000/images/${req.file.originalname}`;

    // // instantiate the model with new data we have
    const newActressRecord = new Actress({name, imgSrc: imagePath, firstSaw});
    // // save in mongoddb
    newActressRecord.save()
        .then(d => {
            console.log('Data is saved in mongodb successfully: ' + d);
        })
        .catch(e => {
            console.log('Error occurred while saving data on mongodb: ' + e);
        })
    // res.redirect('http://localhost:5173/actresses'); // don't work for axios, only simple form request
    const navigationPath = '/actresses';
    res.send(navigationPath);
})

// PUT /actresses/:id - to update the particular actress's data
app.put('/actresses/:id', upload.single('imgSrc'), async(req, res) => {
    // console.log('Hitted PUT REST API');
    // console.log('req.body: ' + JSON.stringify(req.body));
    // console.log('req.file: ' + JSON.stringify(req.file)); // only showing [Object Object] unlike post where it showed full details even though the file is getting stored in the public/images folder in both cases - so the solution to solve the [object, object] issue is to JSON.stringify it and it shows content, and got to know it was caused due to parsing of object couldn't happen here
    const {id} = req.params;
    const {name, firstSaw} = req.body;
    let imagePath;
    if(req.file) {
        const {originalname} = req.file;
        imagePath = `http://localhost:3000/images/${originalname}`;
    }
    else {
        const findExistingActressRecord = await Actress.findById(id);
        imagePath = findExistingActressRecord.imgSrc;
    }
    const updateActressData = await Actress.findByIdAndUpdate(id, {$set: {name: name, imgSrc: imagePath, firstSaw: firstSaw}}, {new: true, runValidators: true});
    console.log('updated data:' + updateActressData);
    const navPath = '/actresses';
    res.send(navPath);
})

// DELETE /actresses/:id - to delete the particular actress from the mongodb
app.delete('/actresses/:id', async(req, res) => {
    // console.log('Hitted server side delete route');
    const {id} = req.params;
    const deleteActress = await Actress.findByIdAndDelete(id);
    console.log(deleteActress);
    const navPath = '/actresses';
    res.send(navPath);
})

app.listen(3000, () => {
    console.log('Backend listening on port 3000');
})