const jwt = require('jsonwebtoken');
const secret = "Eco Harmony";


function setUser(user){
    payload = {
        _id : user.user_id,
        email : user.mail_id,
        role : user.role

    }
    return jwt.sign(payload, secret)
}

function getUser(token){
    try{
        if(!token) return;
        return jwt.verify(token, secret)
    }
    catch(err){
        return;
    }
    
}

module.exports = {
    setUser,
    getUser
}