const nodemailer = require('nodemailer');
const config = require('config');
const email = config.get('email');
const ejs = require("ejs");

let sendMail = async function (emailAddress, subject, template, options) {
    try {
        return new Promise((resolve, reject) => {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: email.email,
                        pass: email.pass
                    },
                    logger: false, // log to console
                    debug: true // include SMTP traffic in the logs
                });
                ejs.renderFile(template, options, function (error, result) {
                    if (error) {
                        console.log("sendMail error", error);
                        reject(error);
                    } else {
                        transporter.sendMail({
                            to: emailAddress,
                            subject: subject,
                            from: `${config.get('hostName')} <${email.email}>`,
                            html: result
                        }).then((info) => {
                            // console.log("message sent successfully.", info);
                            resolve(info);
                        }).catch((error) => {
                            // console.log("sendMail error", error);
                            reject(error);
                        });
                    }
                });
            } catch (error) {
                console.log("Error in main catch in email service", error);
            }
        });
    } catch (error) {
        console.log("Error in main catch in mailer service", error);
    }
}

module.exports = sendMail;