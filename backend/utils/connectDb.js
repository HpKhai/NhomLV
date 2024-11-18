const mongoose = require('mongoose');
require('dotenv').config()

// Hàm kết nối cơ sở dữ liệu
const connectDb = async () => {
    try {
        // Lấy URL từ .env
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, // Khuyến nghị để tránh các cảnh báo
            useUnifiedTopology: true // Tối ưu hóa kết nối
        });
        console.log('Kết nối MongoDB thành công!');
        return db;  // Trả về kết nối cơ sở dữ liệu
    } catch (error) {
        console.error('Kết nối cơ sở dữ liệu thất bại:', error);
        process.exit(1); // Thoát ứng dụng nếu không kết nối được
    }
};
module.exports = connectDb;
