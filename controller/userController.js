const _   = require('lodash');
const { User, validateProfileUpdate} = require('../models/user');
const { errorRes, successRes } = require('../startup/errorHandling');
const { uploadFile, getImage } = require('../helpers/commonHelper');

let authController = {};

// User: View
authController.viewUser = async(req, res) => {
    try {
        // Check User
        const user = await User.findById(req.user._id).select();
        if (!user) return res.status(400).send(errorRes("User not found."));

        // Pick data
        const returnData = _.pick(user, [
            '_id', 'name', 'email', 'userType', 'mobile', 'isEmailVerified', 'createdAt', 'img'
        ]);

        returnData.img = (returnData.img) ? getImage('user_images', returnData.img): '';      
        
        res.send(successRes ("User details.", returnData));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

// User: Edit
authController.editUser = async(req, res) => {
    try {

        // Validate data
        const { error } = validateProfileUpdate(req.body);
        if (error) return res.status(400).send(errorRes(error.details[0].message));

        // Check User
        const user = await User.findById(req.user._id).select();
        if (!user) return res.status(400).send(errorRes("User not found."));

        user.name   = (req.body.name) ? req.body.name: '';        
        user.gender = (req.body.gender) ? req.body.gender: '';
        user.mobile = (req.body.mobile) ? req.body.mobile: '';      
        
        if (req.files.img) {
            user.img = await uploadFile('user_images', req.files.img);
        }  

        // Save Data
        await user.save();
        user.img = (user.img) ? getImage('user_images', user.img): '';      
        
        res.send(successRes ("Password updated successfully", _.pick(user, 
            ['_id', 'name', 'email', 'gender', 'mobile', 'img']
        )));
    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

// User: Delete
authController.deleteUser = async(req, res) => {
    try {
        // Check User
        const user = await User.findById(req.user._id).select();
        if (!user) return res.status(400).send(errorRes("User not found."));

        user.status = 2;
        await user.save();

        // Pick data
        const returnData = _.pick(user, [
            '_id', 'name', 'email', 'userType', 'mobile', 'isEmailVerified', 'createdAt', 'img'
        ]);
        
        res.send(successRes ("Acount deleted successfully.", returnData));

    } catch (error) {
        res.status(400).send(errorRes("Something went wrong!", error.message));
    }    
}

module.exports = authController;
