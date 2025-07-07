const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken'); // sets req.vendorId
const router = express.Router();

// POST /vendor/add-firm → Adds a firm to DB
router.post('/add-firm', verifyToken, firmController.addFirm);
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);


module.exports = router;
