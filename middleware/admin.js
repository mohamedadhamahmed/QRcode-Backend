module.exports= function (req,res,next) {
console.log('isadmin: '+req.user.isadmin)
    if(!req.user.isadmin){
      return  res.status(403).send('you are not admin ....')
    }
    next()


    
}