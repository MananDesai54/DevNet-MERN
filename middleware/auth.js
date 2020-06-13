const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if there is token
    if(!token) {
        return res.status(401).json({msg:'Not authorised...!!!'});
    }

    //verify token
    try {
        const decoded = jwt.decode(token,config.get('jwtSecretKey'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:'Not valid token'});
    }
}