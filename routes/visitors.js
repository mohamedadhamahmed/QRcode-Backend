const express=require('express')
const router=express.Router()
const Joi = require('joi');
const app=express();
const mongoose=require('mongoose')
const _=require('lodash')
const  {Visitors,uservaliaded}=require('../model/visitor')
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




router.get('/',async(req, res)=>{

    let find_visitor=await Visitors.findOne({national_number:req.query.national_number});
console.log("hi  "+req.query.national_number)
    res.json(find_visitor);
  
  });
router.post('/',async(req,res)=>{
    const {error}=uservaliaded(req.body);
    console.log("inside visitor post hi")
    console.log("name : "+req.body.name)
    console.log("national number : "+req.body.national_number)
    let visitor=await Visitors.findOne({national_number:req.body.national_number});
  console.log("visitor : "+visitor)
if(visitor){
 return res.status(404).send("user  found in database");
}
if(error){
      console.log(" error :"+error.details[0].message)
    
      return res.status(404).send(error.details[0].message)
    }
    const user=await new Visitors(_.pick(req.body,['name','degree','unit','national_number','phone_number',"creator"
   ]));
   
   

      await user.save();
      return res.status(200).send(user)


    }

  
 )
 module.exports=router;