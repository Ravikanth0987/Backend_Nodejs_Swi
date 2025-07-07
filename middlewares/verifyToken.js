const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    //verify decoded vendor id with token
    const decoded = jwt.verify(token, secretKey); // verify token
//verify decoded vendor id with actual vendor id
    const vendor = await Vendor.findById(decoded.Vendor_Id); // ✅ fixed field name
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }

    req.vendorId = vendor._id; // ✅ set vendorId for use in controller
  //next allows when try block is correct
    next(); 

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
