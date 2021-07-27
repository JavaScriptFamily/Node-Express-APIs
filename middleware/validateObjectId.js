const mongoose = require('mongoose');
const { errorRes, successRes} = require('../startup/errorHandling');

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send(errorRes ('Invalid ID.'));
  
  next();
}