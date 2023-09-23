const mongoose = require("mongoose")
require('dotenv').config();

// const mongooseURL = 'mongodb://localhost:27017';

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to DB")
    });
}

module.exports = connectToMongo;
