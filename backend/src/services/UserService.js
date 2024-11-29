const cookieParser = require('cookie-parser')

const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")
const { default: mongoose } = require('mongoose')


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, role } = newUser
        try {
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword,
                phone,
                role,
            })

            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = async (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, password } = userLogin; // Lấy thông tin đăng nhập
        try {
            const checkUser = await User.findOne({ name: name });

            if (checkUser === null) {
                return reject({
                    status: 'ERR',
                    message: 'Tài khoản chưa được tạo'
                });
            }
            // Sử dụng await để so sánh mật khẩu
            const comparePassword = await bcrypt.compare(password, checkUser.password);

            if (!comparePassword) {
                return reject({
                    status: 'ERR',
                    message: 'Sai mật khẩu'
                });
            }

            // Tạo token và trả về kết quả
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                role: checkUser.role
            });
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                role: checkUser.role
            });

            resolve({
                status: 'OK',
                message: 'Đăng nhập thành công',
                access_token,
                refresh_token
            });

        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Another Err',
                error: e.message
            })
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: mongoose.Types.ObjectId(id)
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user SUCCESS',

            })

        } catch (e) {
            reject(e)
        }
    })
}
const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids.map(id => mongoose.Types.ObjectId(id)) })
            resolve({
                status: 'OK',
                message: 'Delete user SUCCESS',

            })

        } catch (e) {
            reject(e)
        }
    })
}


const getAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: ' SUCCESS',
                data: allUser
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: ' SUCCESS',
                data: user
            })

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}