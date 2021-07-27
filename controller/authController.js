const bcrypt = require('bcryptjs');
const _      = require('lodash');
const crypto = require('crypto');
const config = require('config');
const sendMail = require('../services/email.service');
const { errorRes, successRes } = require('../startup/errorHandling');
const { uploadFile, getImage } = require('../helpers/commonHelper');
const { User, validateUser, validateLoginUser } = require('../models/user');

let authController = {};

// Auth: Add User
authController.signupUser = async(req, res) => {
    try {        
        // Validate data
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(errorRes(error.details[0].message));

        // Check: Is email already exist
        let isExist = await User.findOne({ email: req.body.email, status: { $ne: 2 } });
        if (isExist) return res.status(400).send(errorRes('This email address already in use.'));

        // Pick data from request
        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(user.password, salt);

        user.password = password;
        user.img    = (req.body.img) ? await uploadFile('user_images', req.body.img): '';
        user.gender = (req.body.gender) ? req.body.gender: '';
        user.mobile = (req.body.mobile) ? req.body.mobile: '';        

        // Save Data
        await user.save();
        const authToken = user.generateAuthToken();

        // Send sign up notification 
        let options = {
            name: user.name,
            email: user.email,
            hostName: config.hostName,
            hostEmail: config.hostEmail,
            userType: "User"
        }

        sendMail(user.email, 'Sign UP Notification', "views/emailTemplate/authUserSignupNotification.ejs", options);

        // Return data
        let returnData = _.pick(user, [
            '_id', 'userType', 'name', 'email', 'mobile', 'img', 'gender'
        ]);

        returnData.img   = getImage('user_images', user.img);
        returnData.token = authToken;

        res.header('x-auth-token', authToken).send(
            successRes("Congratulations! You are registered successfully.", returnData)
        );        
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }
}

// Auth: Login User
authController.loginUser = async(req, res) => {
    try {
        // Validate user
        const { error } = validateLoginUser(req.body);
        if (error) return res.status(400).send(errorRes(error.details[0].message));
    
        // Check: Is email exist
        let user = await User.findOne({ email: req.body.email, status: { $ne: 2 } });
        if (!user) return res.status(400).send(errorRes('Invalid email or password.'));
    
        // Check: Is user is inactive
        if (user.status != 0) return res.status(400).send(errorRes('Please contact to admin while your profile in inactive.'));
    
        // Validate Password
        const validPassword = await bcrypt.compare(req.body.password.toString(), user.password);
        if (!validPassword) return res.status(400).send(errorRes('Invalid email or password.'));
    
        // Return Data
        const authToken = user.generateAuthToken();        
        let returnData = _.pick(user, [
            '_id', 'userType', 'name', 'email', 'mobile', 'img', 'gender', 'charity'
        ]);
        returnData.img = getImage('user_images', user.img);
        returnData.token = authToken;
    
        res.send(successRes("User Login Successfully", returnData));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }
}

// Auth: Login Admin
authController.adminLogin = async(req, res) => {
    try {
        // Validate user
        const { error } = validateLoginUser(req.body);
        if (error) return res.status(400).send(errorRes(error.details[0].message));
    
        // Check: Is email exist
        let user = await User.findOne({ email: req.body.email, userType: 1, status: { $ne: 2 } });
        if (!user) return res.status(400).send(errorRes('Invalid email or password.'));
    
        // Check: Is user is inactive
        if (user.status != 0) return res.status(400).send(errorRes('Please contact to admin while your profile in inactive.'));
    
        // Validate Password
        const validPassword = await bcrypt.compare(req.body.password.toString(), user.password);
        if (!validPassword) return res.status(400).send(errorRes('Invalid email or password.'));
    
        // Return Data
        const authToken = user.generateAuthToken();        
        let returnData = _.pick(user, [
            '_id', 'userType', 'name', 'email', 'mobile', 'img', 'gender', 'charity'
        ]);
        returnData.img = getImage('user_images', user.img);
        returnData.token = authToken;
    
        res.send(successRes("User Login Successfully", returnData));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }
}

// Auth: Logout User, Admin
authController.logout = async(req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if (!user) return res.status(400).send(errorRes('Invalid request.'));
        user.generateAuthToken();

        let returnData = _.pick(user, [
            '_id', 'userType', 'name', 'email', 'mobile', 'img', 'gender', 'charity'
        ]);

        res.send(successRes("User Logged Out Successfully", returnData));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

// Auth: Forgot Password
authController.forgotPassword = async(req, res) => {
    try {
        if (!req.body.email) return res.status(400).send(errorRes('Email address is required.'));

        // Check: Is email already exist
        let user = await User.findOne({ email: req.body.email, status: {$ne: 2} });
        if (!user) return res.status(400).send(errorRes('This email address is not registered with us.'));
        
        // Check: Is user is inactive
        if (user.status != 0) return res.status(400).send(errorRes('Please contact to admin while your profile in inactive.'));

        user.forgotPasswordToken = crypto.randomBytes(16).toString('hex');
        await user.save();

        resetLink = config.WEB_URL + "/" + user.forgotPasswordToken;

        let options = {
            name: user.name,
            email: user.email,
            resetLink: resetLink,
            projectName: config.hostName
        }
        sendMail(user.email, 'Forgot Password', "views/emailTemplate/authForgotPassword.ejs", options);
        
        res.send(successRes("A temporary password has been sent to your email address.",  _.pick(user, ['_id', 'email', 'forgotPasswordToken'])));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

// Auth: Verify Forgot Password Token
authController.verifyForgotPasswordToken = async(req, res) => {
    try {
        const token = req.params.token;
        if (!token) return res.status(400).send(errorRes("Token is required."));

        const user = await User.findOne({ forgotPasswordToken: token });
        if (!user) return res.status(404).send(errorRes('Token is invalid.'));

        res.send(successRes("Token is valid.",  _.pick(user, ['_id', 'email', 'forgotPasswordToken'])));

    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

// Auth: Reset Password
authController.resetPassword = async(req, res) => {
    try {
        const token = req.body.token;
        const newPass     = req.body.newPassword;
        const confirmPass = req.body.confirmPassword;

        // Validate Req.
        if (!token) return res.status(400).send(errorRes("Token is required."));
        if (!newPass) return res.status(400).send(errorRes("New password is required."));
        if (!confirmPass) return res.status(400).send(errorRes("Confirm password is required."));
        if (newPass != confirmPass) return res.status(400).send(errorRes("New and confirm password must be same."));

        const user = await User.findOne({ forgotPasswordToken: token });
        if (!user) return res.status(404).send(errorRes('Token is invalid.'));  

        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(confirmPass, salt);
    
        user.forgotPasswordToken = "";
        user.password = hashPassword;
        await user.save();

        let options = {
            name: user.name,
            email: user.email,
            resetLink: resetLink,
            projectName: config.hostName
        }
        sendMail(user.email, 'Password Updated Successfully', "views/emailTemplate/authPasswordUpdated.ejs", options);

        res.send(successRes ("Password updated successfully", _.pick(user, ['_id', 'name', 'email'])));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

// Auth: Update Password
authController.updatePassword = async(req, res) => {
    try {
        // Check user
        const user = await User.findById(req.user._id).select();
        if (!user) return res.status(400).send(errorRes("User not found."));
    
        // Validate Request
        if (!req.body.currentPassword) return res.status(400).send(errorRes("Current password is required."));
        if (!req.body.newPassword) return res.status(400).send(errorRes("New password is required."));
        if (!req.body.confirmPassword) return res.status(400).send(errorRes("Confirm password is required."));
        if (req.body.newPassword != req.body.confirmPassword) return res.status(400).send(errorRes("New and confirm password must be same."));
        
        // Validate current password
        const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!validPassword) return res.status(400).send(errorRes('The current password is incorrect.'));
        
        const salt  = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.confirmPassword, salt);
     
        user.password = hashPassword;
        await user.save();

        let options = {
            name: user.name,
            email: user.email,
            projectName: config.hostName
        }
        sendMail(user.email, 'Password Updated Successfully', "views/emailTemplate/authPasswordUpdated.ejs", options);
    
        res.send(successRes ("Password updated successfully", _.pick(user, ['_id', 'name', 'email'])));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

module.exports = authController;
