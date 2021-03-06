const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String},
        age: { type: Number},
        gender: { type: String},
        address: { type: String},
        productImage:{type: String, required: true},
        createdAt: { type: Date,default:Date.now}
});

module.exports = mongoose.model('Product', productSchema);