const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}
