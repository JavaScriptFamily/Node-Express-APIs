const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  req.user = '';
  if(token){
    try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decoded; 
    }
    catch (ex) {
    }
  }
  next();
}
