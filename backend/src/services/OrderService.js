const { default: mongoose } = require("mongoose")
const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")


const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {

        const { orderItems, paymentMethod, shippingMethod, itemsPrice, shippingPrice, totalPrice, isPaid, paidAt,
            fullName, address, city, phone, user, email, retailerName, retailerId } = newOrder
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
                    { new: true, returnDocument: 'after' }
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
                        retailerName,
                        retailerId
                    })
                    if (createdOrder) {
                        await EmailService.sendEmailCreateOrder(email, orderItems)
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

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id);
            if (!order) {
                return resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                });
            }

            const productData = await Order.findOneAndUpdate(
                {
                    _id: order._id, // Điều kiện tìm sản phẩm theo ID
                    isPaid: false      // Chỉ cập nhật nếu isPaid hiện tại là false
                },
                {
                    isPaid: true       // Thay đổi isPaid thành true
                },
                {
                    new: true,         // Trả về tài liệu sau khi cập nhật
                    returnDocument: 'after'
                }
            );

            if (!productData) {
                return resolve({
                    status: 'ERR',
                    message: 'Product not found or already updated'
                });
            }

            // Cập nhật thông tin đơn hàng
            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                data,
                { new: true } // Trả về tài liệu sau khi cập nhật
            );
            resolve({
                status: 'OK',
                message: 'Update successful',
                data: updatedOrder
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'An error occurred during update',
                error: e.message
            });
        }
    });
};


const getOrderRetailer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                retailerId: id
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
                        isPaid: false
                    },
                    {
                        isPaid: true
                    },
                    {
                        new: true,
                        returnDocument: 'after'
                    }
                )


                if (productData) {
                    order = await Order.findByIdAndUpdate(id)
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

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    getOrderRetailer,
    updateOrder
}