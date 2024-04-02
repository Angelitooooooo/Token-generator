const jwt = require('jsonwebtoken');
const User = require('../sample/data')


function authenticateToken(req , res , next ){
    let token =     req.headers.token
    if(token == null){
        if(err) return  res.status(401).json({
            title : 'Unathorized'
        })
    }
    jwt.verify(token,process.env.SECRET_KEY, ( err , decoded ) =>{
        if(err) return  res.status(403).json({
            title : 'Unathorized'
        })
        const { userId } = decoded;
        const foundUser = User.find(user => user.id === userId);
        if (foundUser) {
            req.user = foundUser
        } else {
            return res.status(404).json({
                title : 'error',
                message : 'No data Found',
            })
        }
        next();
    })
}

function refreshToken(req, res,next) {
    const token = req.headers.refreshtoken;
    if (!token) {
        return res.status(401).json({ title: 'Unauthorized' });
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ title: 'Forbidden' });
        }
        // Generate a new token with updated expiration
        const newToken = jwt.sign({ userId: decoded.userId }, process.env.SECRET_KEY, { expiresIn: '1m' });
        req.token = newToken
        next()
        // res.status(200).json({ token: newToken });
    });
}


module.exports = {authenticateToken,refreshToken}