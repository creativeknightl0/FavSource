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

app.get('/favActress/:id', (req, res) => {
    const { id } = req.params;
    const particularActress = favActresses[id];
    res.render('actress-page', { particularActress });
})

app.listen(3000, () => {
    console.log('Backend listening on port 3000');
})