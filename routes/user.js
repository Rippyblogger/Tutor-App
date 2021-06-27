const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth')

// import router controller
const usersController = require('../controllers/usersController');

// create user route
router.post('/api/auth/login', [
    check('email', 'Enter a valid email').isEmail(),
    check('password','Enter a valid password').exists()
] ,usersController.loginUser);

// Get route

router.get('/api/auth', auth, usersController.getLoggedInUser)


module.exports = router
