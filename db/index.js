const mongoose = require("mongoose");
require("dotenv").config();

const {DB_URI} = process.env

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            })
        
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
