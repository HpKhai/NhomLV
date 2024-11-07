// connectDb.js
const mongoose = require('mongoose');

// Hàm kết nối cơ sở dữ liệu
const connectDb = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/LuanVan');
        console.log('Kết nối MongoDB thành công!');
        return db;  // Trả về kết nối cơ sở dữ liệu
    } catch (error) {
        console.error('Kết nối cơ sở dữ liệu thất bại:', error);
        process.exit(1); // Thoát ứng dụng nếu không kết nối được
    }
};

module.exports = connectDb;
