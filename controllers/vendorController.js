const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();

// Secret key from .env file
const secretKey = process.env.WhatIsYourname;

// Vendor Registration
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if email already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new vendor
    const newVendor = new Vendor({ username, email, password: hashedPassword });
    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully" });
    console.log('Vendor registered:', email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Vendor Login
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find vendor by email
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ Vendor_Id: vendor._id }, secretKey, { expiresIn: "1h" });
    // Respond with token
    res.status(200).json({success: "Login successful",token: token
    });
    console.log(email, "Token generated:", token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 //to get details of all vendors
const getAllVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
//To get details of by id
const getVendorById = async(req, res) => {
    const vendorId = req.params.ID;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');//populate means to get all the recordss
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" })
        }
        //const vendorFirmId = vendor.firm[0]._id;
        //res.status(200).json({ vendorId, vendorFirmId, vendor })
        res.status(200).json({vendor});
        //console.log(vendorFirmId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = { vendorRegister, vendorLogin , getAllVendors,getVendorById};
