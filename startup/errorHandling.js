const config = require('config');
const sendMail = require('../services/email.service');

function errorResonse (errorMessage, error='') {
    if (error != '') {
        // Save error in the database
        let options = { error: error }
        sendMail(config.errorEmail, 'Error', "views/emailTemplate/errorHandling.ejs", options);
    }

    return {
        'success': false,
        'message': errorMessage.replace(/[^\w-]+/g,' ').trim(),
        'error': error
    };
}

function successResonse (successMessage, data) {
    return {
        'success': true,
        'message': successMessage,
        'data': data
    };
}

module.exports.errorRes = errorResonse;
module.exports.successRes = successResonse;