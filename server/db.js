const mongoose = require('mongoose');

// CHANGED: Now pointing to your local MongoDB service instead of the cloud IP
const mongoURI = "mongodb://127.0.0.1:27017/medmed";

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        // Keeps the database name consistent with your assignment parameters
        await mongoose.connect(mongoURI, { dbName: 'stayhealthybeta1' });
        console.info('Connected to Mongo Successfully');

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`);

        return await connectToMongo(nextRetryCount);
    }
};

module.exports = connectToMongo;