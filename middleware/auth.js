//check for token
const { json } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;

module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header('Authorization');
    
    //Check token existence
    if (!token) {
        return req
            .status(401).json({statusCode: 401, message: "No token, authorization denied"})
    }

    try {
        const decoded = jwt.verify(token, SECRET)

        // Assign user to request object
        next();
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            message: "Invalid credentials"
        })
    }
}