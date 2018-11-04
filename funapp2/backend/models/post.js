const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    id: {type: String},
    name: {type: String, required: true},  // JS asks for capitilezed String type
    description: { type: String, required: true},
    // could have just 'default' after type remove a .... requirement of content for succesful data input
    created: {type: String, required: true},
    rating: {type: String},
    imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema); // exporting > (' schema name ', & schema variable?)
