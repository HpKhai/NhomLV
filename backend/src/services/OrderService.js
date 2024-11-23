const { default: mongoose } = require("mongoose")
const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")


const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, shippingMethod, itemsPrice, shippingPrice, totalPrice, isPaid, paidAt,
            fullName, address, city, phone, user, email } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: mongoose.Types.ObjectId(order.product),
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount

                        }
                    },
                    { new: true }
                )
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            city,
                            phone
                        },
                        paymentMethod,
                        shippingMethod,
                        isPaid,
                        paidAt,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
                    })
                    if (createdOrder) {
                        // await EmailService.sendEmailCreateOrder(email, orderItems)
                        resolve({
                            status: 'OK',
                            message: 'success'
                        })
                    }
                } else {
                    return {
                        status: 'ERR',
                        message: 'Error',
                        id: order.product
                    }
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: ' SUCCESS',
                data: order
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: ' SUCCESS',
                data: order
            })

        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        selled: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id

            if (newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

// const getAllOrder = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allOrder
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

module.exports = {
    createOrder,
    getOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    // getAllOrder
}