const StoreService = require('../services/StoreService')

const createStore = async (req, res) => {

    try {
        const { name, image, address, phone, rating, count } = req.body
        if (!name || !image || !address || !phone || !rating || !count) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await StoreService.createStore(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createStore,

};