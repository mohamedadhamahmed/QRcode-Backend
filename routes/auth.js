const express=require('express')
const router=express.Router()
const Joi = require('joi');
const mongoose=require('mongoose')
const _=require('lodash')
const  {User,uservaliaded}=require('../model/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



router.post('/',async(req,res)=>{
  console.log("hello in auth+++*******")
    const {error}=valiaded(req.body);
    console.log(req.body.email)
    console.log(req.body.password)

let user1=await User.findOne({email:req.body.email});

if(!user1){
 return res.status(404).send("invalid email or password");
}
    if(error){
      console.log(" error :"+error.details[0].message)
    
      return res.status(404).send(error.details[0].message)
    }
    
   const checkpassword= await bcrypt.compare( req.body.password, user1.password);
   console.log("inside 2"+checkpassword)

   if(!checkpassword){
    return res.status(404).send("invalid email or password");
   }
   console.log("inside 3"+checkpassword)

   const  token = user1.generateTokens();
   console.log("inside 4"+token)

      res.send(user1)
    }

  
 )

 
function valiaded(req){
    const schema=Joi.object({
     
      email:Joi.string().min(10).required().email(),
      password:Joi.string().min(10).required(),
    });
    return schema.validate(req);
  
  }
 module.exports=router;