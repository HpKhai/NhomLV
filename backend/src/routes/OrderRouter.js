const express = require('express');
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/create', OrderController.createOrder)
router.get('/get-all', OrderController.getAllOrder)
router.get('/get-order-retailer/:id', OrderController.getOrderRetailer)
router.put('/update/:id', OrderController.updateOrder)
router.get('/get-order-details/:id', OrderController.getOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)

router.delete('/delete/:id', authMiddleware, OrderController.deleteOrder)

router.post('/deleteMany-order', authMiddleware, OrderController.deleteManyOrder)



module.exports = router 