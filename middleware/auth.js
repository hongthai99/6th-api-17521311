const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x_auth_token');

    // check for token
    if(!token) 
        return res.status(401).json({msg: 'No Token and Authorrization denied'});
    try{
        //Veryfy token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //add user from payload
    req.user=decoded;
    next();
    } catch(e){
        res.status(400).json({msg: 'Token is not valid'});
    }
}

module.exports = auth;