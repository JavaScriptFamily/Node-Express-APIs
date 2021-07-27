const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType: {
        type: Number,
        //1: admin, 2: user, 4: school
        default: 2
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    mobile: {
        type: String,
        default: ''
    },
    gender: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },    
    img: {
        type: String
    },
    status: {
        type: Number,
        minlength: 1,
        maxlength: 1,
        default: 0
    },
    createdAt: {
        type: Date,
        minlength: 1,
        maxlength: 1,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        minlength: 1,
        maxlength: 1,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateLoginUser(user) {
    const schema = {
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required(),
    };
    
    return Joi.validate(user, schema);
}

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(35).required(),
        email: Joi.string().min(5).max(254).required().email(),
        mobile:  Joi.string().allow('').optional(),
        password: Joi.string().min(5).max(255).required(),
        confirmPassword: Joi.string().allow('').optional(),
        gender: Joi.string().allow('').optional(),
        img: Joi.string().allow('').optional()
    };
    
    return Joi.validate(user, schema);
}

function validateProfileUpdate(user) {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        mobile:  Joi.string().required(),
        gender:  Joi.string().valid(['Male','Female','Other']).required(),
        img: Joi.string().allow('').optional()
    };
    
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLoginUser = validateLoginUser;
exports.validateProfileUpdate = validateProfileUpdate;
