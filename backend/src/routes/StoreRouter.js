const express = require('express');
const router = express.Router()
const StoreController = require('../controllers/StoreController');

router.post('/create-store', StoreController.createStore)

module.exports = router 