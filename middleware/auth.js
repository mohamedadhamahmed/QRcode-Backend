var jwt = require('jsonwebtoken');
module.exports= function (req,res,next) {
    const token=req.header('x-auth-token');
    if(!token){
        res.status(401).send('access rejected....')
    }
    try{
        const decodetoken=jwt.verify(token,'privatekey');

        req.user=decodetoken;

        next();
    }catch(e){
        res.status(400).send('wrong token...')

    }


    
}