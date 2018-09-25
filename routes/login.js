const express = require('express');
const router = express.Router();
const expressValidator  = require('express-validator');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');

// Express Validator Middleware
router.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root  = namespace.shift()
        , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

// Bring in Register Model
let Register = require('../models/Register');

// @route  GET login
// @desc   GET Login page
// @access Public
router.get('/login', (req, res) => {
    res.render('login');
});

// @route  POST login
// @desc   POST Register data
// @access Public
router.post('/login', [
    sanitizeBody('firstName')
    .trim()
    .escape(),
    sanitizeBody('lastName')
    .trim()
    .escape(),
    sanitizeBody('email')
    .normalizeEmail(),
    sanitizeBody('phone')
    .trim()
    .escape(),
    sanitizeBody('password')
    .trim()
    .escape()
    ], (req, res) => {
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const rePassword = req.body.rePassword;

    // Data validation
    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('phone', 'Phone is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be at least 6 characters').isLength(6);
    req.checkBody('rePassword', 'Passwords do not match').equals(req.body.password);

    // Validation errors
    let errors = req.validationErrors();

    if(errors) {
        res.render('login', {
            errors:errors
        });
    } else {
        // Create new Register object model
        let newRegister = new Register ({
            firstName: firstName,
            lastName:lastName,
            email:email,
            phone:phone,
            password:password
        });

        // Generate a hash for the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newRegister.password, salt, (err, hash) => {
                if(err) {
                    console.log(err);
                }
                newRegister.password = hash;

                // Save the data in the database
                newRegister.save((err) => {
                    if(err) {
                        console.log(err);
                        return;
                    } else {
                        res.redirect('main');
                    }
                });

            });
        });

    }

});

// @route  GET main
// @desc   GET Main page
// @access Public
router.get('/main', (req, res) => {
    res.render('main');
});

// Exports the router 
module.exports = router;