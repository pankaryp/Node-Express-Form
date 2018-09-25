// Require mongoose
const mongoose = require('mongoose');

// Model Schema
const RegisterSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// Export the model
const Register = module.exports = mongoose.model('Register', RegisterSchema);