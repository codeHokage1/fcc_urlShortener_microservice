const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const urlSchema = new Schema({
    "original_url": {
        type: String,
        required: [true, "Must input a url"]
    },
    "short_url": String
})

module.exports = mongoose.model("Url", urlSchema);