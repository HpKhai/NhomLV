const cookieParser = require('cookie-parser')

const Product = require("../models/ProductModel")
const bcrypt = require("bcrypt")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount, origin, uses, report, preserve, userName } = newProduct
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
                name, image, type, price, countInStock, rating, description, discount, origin, uses, report, preserve, userName
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
const getAllProductRetailer = (limit, page, sort, filter, userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = {}; // Tạo object để chứa các điều kiện tìm kiếm

            // Nếu có `userName`, thêm điều kiện lọc theo `userName`
            if (userName) {
                query.userName = userName;
            }

            // Nếu có `filter`, thêm điều kiện lọc theo `filter`
            if (filter) {
                const label = filter[0];
                query[label] = { '$regex': filter[1], '$options': 'i' }; // Regex không phân biệt chữ hoa/thường
            }

            const totalProduct = await Product.countDocuments(query); // Đếm tổng sản phẩm theo điều kiện

            let productsQuery = Product.find(query).limit(limit).skip(page * limit);

            // Nếu có `sort`, thêm điều kiện sắp xếp
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                productsQuery = productsQuery.sort(objectSort);
            }

            const products = await productsQuery; // Lấy dữ liệu sản phẩm

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: products,
                total: totalProduct,
                pageCurrent: Number(page + 1), // Trang hiện tại, tính từ 1
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
};


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