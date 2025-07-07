const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path'); // ✅ missing in your code

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route handler to add a firm
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    // You must set req.vendorId before this (e.g., in authentication middleware)
    const vendor = await Vendor.findById(req.vendorId);//based on vendor id and token we add restuarant or firm
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id
    });
  
     const savedFirm = await firm.save();
        //const firmId = savedFirm._id
        //const vendorFirmName = savedFirm.firmName 
        vendor.firm.push(savedFirm) //to psuh into vendor
        await vendor.save()

    res.status(200).json({
      message: "Firm Added successfully",
      firmId: savedFirm._id,
      vendorFirmName: savedFirm.firmName
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
  addFirm: [upload.single('image'), addFirm],deleteFirmById};
