const cookieParser = require('cookie-parser')

const Product = require("../models/ProductModel")
const bcrypt = require("bcrypt")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount, origin, uses, report, preserve, retailerName, retailerId } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                })
            }
            const createdProduct = await Product.create({
                name, image, type, price, countInStock, rating, description, discount, origin, uses, report, preserve, retailerName, retailerId
            })
            if (createdProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Product is not defined'
                });
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            });
        } catch (e) {
            reject(e);
        }
    });
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product SUCCESS',

            })

        } catch (e) {
            reject(e)
        }
    })
}
const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product SUCCESS',

            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: ' SUCCESS',
                data: product
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),   // Trang hiện tại, tính từ 1
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),   // Trang hiện tại, tính từ 1
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),   // Trang hiện tại, tính từ 1
                totalPage: Math.ceil(totalProduct / limit)
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getAllProductRetailer = (limit, page, sort, filter, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tổng số sản phẩm
            const totalProduct = await Product.countDocuments({ retailerId: userId });

            // Tạo truy vấn tìm kiếm sản phẩm
            let query = { retailerId: userId };  // Chỉ lấy sản phẩm của nhà bán hàng hiện tại

            // Thêm điều kiện lọc nếu có
            if (filter) {
                const label = filter[0];
                query[label] = { '$regex': filter[1], '$options': 'i' };  // Thêm tùy chọn 'i' cho regex (không phân biệt chữ hoa/thường)
            }

            // Truy vấn sản phẩm với lọc và sắp xếp (nếu có)
            const productsQuery = Product.find(query)
                .limit(limit)
                .skip(page * limit);

            // Thêm điều kiện sắp xếp nếu có
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                productsQuery.sort(objectSort);
            }

            // Lấy các sản phẩm đã lọc và sắp xếp
            const allProduct = await productsQuery;

            // Trả về dữ liệu
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),   // Trang hiện tại, tính từ 1
                totalPage: Math.ceil(totalProduct / limit)
            });

        } catch (e) {
            reject(e);
        }
    });
}




const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allType,
            })

        } catch (e) {
            reject(e);
        }
    });
}





module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getAllProductRetailer,
    deleteManyProduct,
    getAllType
}