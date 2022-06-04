const express=require('express')
const router=express.Router()
const Joi = require('joi');
const app=express();
const mongoose=require('mongoose')
const _=require('lodash')
const  {User,uservaliaded}=require('../model/user')
const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// const auth=require('../middleware/auth')



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === 'OPTIONS') {
    return res.send(200);
    console.log('Dejo pasar Cors');
  } else {
    return next();
  }
});




router.get('/',async(req, res)=> {

  let user1=await User.findById({_id:req.query.id});
  console.log(user1)
    res.json(user1);
  
  });
router.post('/',async(req,res)=>{
    const {error}=uservaliaded(req.body);
    console.log("inside post")
    console.log("email : "+req.body.email)
    console.log("password : "+req.body.password)
    let user1=await User.findOne({email:req.body.email});
  console.log("user"+user1)
if(user1){
 return res.status(404).send("user  found in database");
}
if(error){
      console.log(" error :"+error.details[0].message)
    
      return res.status(404).send(error.details[0].message)
    }
    const user=await new User(_.pick(req.body,['name','degree','department','military_number','phone_number'
   ,'email','password',"isadmin"]));
    const saltRounds = 10;
    user.password=await bcrypt.hash( user.password, saltRounds);

      await user.save();
      const  token = user.generateTokens();
      console.log(token)

      res.header('x-auth-token',token).send(user)}

  
 )
 module.exports=router;