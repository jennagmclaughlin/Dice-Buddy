const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    name: String,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number
});

module.exports = mongoose.model('Character', characterSchema, "characters");