const mongoose = require('mongoose')
const storeSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true },
        image: { type: String, require: true },
        address: { type: String, require: true },
        phone: { type: Number, require: true },
        rating: { type: Number, require: true },
        count: { type: Number, require: true },
    },
    {
        timestamps: true
    }
);
const Store = mongoose.model("Store", storeSchema);