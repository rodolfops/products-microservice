const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: String,
    price_in_cents: Number,
    title: String,
    description: String,    
});

module.exports = mongoose.model('Product', ProductSchema);