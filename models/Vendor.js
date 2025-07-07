const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
   firm: [{
        type: mongoose.Schema.Types.ObjectId,  //we built connection between components here vedor is realte to firm
        ref: 'Firm'
    }]

})
module.exports = mongoose.model('Vendor', vendorSchema);
