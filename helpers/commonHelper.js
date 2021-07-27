const config = require('config');
const fs = require('fs');
const shell = require('shelljs');

let helper = {};

// Helper: Upload File
helper.uploadFile = async(dir, fileData) => {
    let img = '';
    if (dir && fileData) {
        uploadDir = "assets/" + dir;
        if (!fs.existsSync(uploadDir)) {
            // fs.mkdirSync(uploadDir);
            shell.mkdir('-p', uploadDir);
        }
        img = ((new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)) + ".png";

        fileData.mv(uploadDir + "/" + img, function(err) {
            if (err) return res.status(500).send(err);
        });
    }
    return img;
}

helper.uploadMultipleFiles = async(dir, fileData) => {
    let images = [];
    if (dir && fileData) {
        uploadDir = "assets/" + dir;
        if (!fs.existsSync(uploadDir)) {
            shell.mkdir('-p', uploadDir);
        }

        fileData.forEach(element => {
            let img = ((new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)) + ".png";

            images.push(img);
            element.mv(uploadDir + "/" + img, function(err) {
                if (err) return res.status(500).send(err);
            });
        });        
    }
    return images;
}

// Helper: Get Image
helper.getImage = (dir, image) => {
    if (dir && image) {
        return config.IMAGEPATH + "/" + dir + "/" + image;
    }
    return config.IMAGEPATH + (image ? "/" + dir + "/" + image : config.noImage);
}

// Helper: Get User Image
helper.getUserImage = (req, profileImage) => {
    let image = (profileImage) ? config.userProfile + profileImage : config.userDefaultImage;
    return config.ASSETSPATH + image;
}

// Helper: Get Today Date
helper.todayDate = () => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = new Date();
    let day  = date.getDate();
    let month= monthNames[date.getMonth()];
    let todayDate = day + "-" + month + "-" + date.getFullYear();

    return todayDate;
}

// Helper: Make Unique Id
helper.makeUniqueId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Helper: Convert String Into Slug
helper.convertToSlug = (Text) => {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
}

// Helper: Getting Months Diff
helper.monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months < 0 ? 0 : months + 1;
}

module.exports = helper;
