const mongoose = require('mongoose');

const actressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgSrc: String,
    firstSaw: {
        type: String,
        required: true
    }
});

const Actress = mongoose.model('Actress', actressSchema);

module.exports = Actress;