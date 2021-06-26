//import packages
const express = require('express');
require('dotenv').config();
const { PORT } = process.env;
const connectDB = require('./db');


//initialize express
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB connection
connectDB();

//routes
app.get('/', (req, res) => {
    res.json({ message: "Working fine" });
    res.end();
})



//listen for requests
app.listen(PORT, () => {
    console.log(`App Server is listening on port ${PORT}`);
})