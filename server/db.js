const mongoose = require('mongoose');

// Use this exact string to force IPv4 and bypass any dual-stack resolution issues
const mongoURI = "mongodb://172.21.188.182:27017/medapp";const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.error("Connection error details:", error);
    }
};

module.exports = connectToMongo;