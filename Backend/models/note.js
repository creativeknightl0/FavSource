const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: [Object]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;