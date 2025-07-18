const Product = require("../models/Product");
const multer = require("multer");//Images will store in the database only when we are using multer packag   
const Firm = require('../models/Firm')
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
}); 

const upload = multer({ storage: storage });

const addProduct = async(req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);//to get id from firm and based on firmid we add products 

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const product = new Product({ // we add product after firm id is correct
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: firm._id
        })

        const savedProduct = await product.save();  //to save into products 
        firm.products.push(savedProduct);// to add in the database
        await firm.save()
        res.status(200).json(savedProduct) 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}
const getProductByFirm = async(req, res) => {
    try {
        const firmId = req.params.firmId;       
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const restaurantName = firm.firmName;
        const products = await Product.find({ firm: firmId });

        res.status(200).json({ restaurantName, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteProductById = async(req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById };//to store image in the database and remainigb operation will be process in database