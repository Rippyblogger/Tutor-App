const User = require("../models/User");
const { ValidationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { SECRET } = process.env;

exports.loginUser = async (req, res) => {
    const errors = ValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }

    const { email, passowrd } = req.body;
    try {
        let user = User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({
                    statusCode: 400,
                    message: "Invalid Credentials"
                });
        }

        // password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                statusCode: 400,
                message: "invalid credentials"
            });
        }

        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(
            payload,
            SECRET,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                return res.json({
                    statusCode: 200,
                    message: "Logged in successfully",
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin
                    },
                    token
                })
            }
        )

    } catch (error) {
        console.error(error.message);

        res.status(500).send("Server Error");
    }
}

exports.getLoggedInUser = async (req, res) => {
    try {
        // Get user from db
        const user = await User.findbyId(req.user.id).select('-password');

        // Return user
        res.json({
            statusCode: 200,
            message: "User gotten successfully",
            user
        })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}