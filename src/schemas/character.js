const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    characterName: String,
});

module.exports = mongoose.model('Character', characterSchema, "characters");