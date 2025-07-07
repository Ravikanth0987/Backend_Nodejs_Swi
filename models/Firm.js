const mongoose = require('mongoose');
const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true
  },
  area: {
    type: String,
    required: true
  },
  category: [{
    type: String,
    enum: ['veg', 'non-veg']
  }],
  region: [{
    type: String,
    enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
  }],
  offer: {
    type: String
  },
  image: {
    type: String
  },
  vendor: [{
    type: mongoose.Schema.Types.ObjectId,//to build to connection with another component here  vendor is added in the firm 
    ref: 'Vendor'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
