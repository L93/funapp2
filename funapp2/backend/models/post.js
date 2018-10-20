const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    id: {type: String},
    name: {type: String, required: true},  // JS asks for capitilezed String type
    description: { type: String, required: true}, 
    // could have just 'default' after type remove a .... requirement of content for succesful data input
    created: {type: String, default: 'test created'},
    rating: {type: String, default: 'test rating'}
});

module.exports = mongoose.model('Post', postSchema); // exporting > (' schema name ', & schema variable?)
