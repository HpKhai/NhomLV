const cookieParser =require ('cookie-parser')
const JwtService = require('../services/JwtService')
const OderService = require('../services/OrderService')

const createOrder = async (req, res) => {

    try {
        console.log('re',req.boyd)
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
    
}

module.exports = {
    createOrder

}
