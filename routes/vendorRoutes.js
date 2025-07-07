const express = require('express');
const router = express.Router();
const { vendorRegister, vendorLogin, getAllVendors, getVendorById } = require('../controllers/vendorController');
//define the register route
router.post('/register', vendorRegister);
router.post('/login', vendorLogin);
router.get('/all-vendors',getAllVendors);
router.get('/single-vendor/:ID',getVendorById);

module.exports = router;
