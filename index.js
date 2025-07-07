const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes=require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes');
app.use('/uploads', express.static('uploads'));
const cors = require('cors');
const path = require('path')

const PORT = process.env.PORT || 4000;

// Load .env variables
dotenv.config();
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

// Middleware to parse JSON
app.use(bodyParser.json()); // Parses incoming requests as JSON

// Use vendor routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));
// Default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to SUBY</h1>");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server started and running at http://localhost:${PORT}`);
});
