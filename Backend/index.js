const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

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
    console.log('got get request from react frontend');
    const {id} = req.params;
    res.send(actresses[id]);
})

app.listen(3000, () => {
    console.log('Backend listening on port 3000');
})