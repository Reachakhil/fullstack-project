var mongoose =require ('mongoose');

let Customer = new  mongoose.Schema(
    {
        name: { type: String},
        age: { type: Number},
        gender: { type: String},
        address: { type: String},
        createdAt: { type: Date,default:Date.now},
    }
);

module.exports = mongoose.model('customer',Customer)

