const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  sku: { type: String },
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: { type: Number },
  quantity: { type: Number }
},{
    timestamps:true
});

const item = mongoose.model('Item', ItemSchema);
module.exports = item;