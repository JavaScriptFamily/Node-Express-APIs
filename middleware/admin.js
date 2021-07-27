const { User } = require('../models/user');
const { errorRes } = require('../startup/errorHandling');

module.exports = async function (req, res, next) { 
  // 401 Unauthorized
  // 403 Forbidden 
  
  const user = await User.findById(req.user._id).select('-password');  
  if (!user) return res.status(400).send(errorRes('Access denied.'));
  if (user.userType != 1) return res.status(400).send(errorRes('Access denied.'));
  next();
}