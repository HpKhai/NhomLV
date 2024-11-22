const Store = require("../models/StoreModel")

const createStore = (newStore) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, phone, rating, address } = newStore
        try {
            const checkStore = await Store.findOne({
                name: name
            })
            if (checkStore !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of Store is already'
                })
            }
            const createStore = await Store.create({
                name, image, phone, rating, address
            })
            if (createStore) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createStore
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createStore,
}