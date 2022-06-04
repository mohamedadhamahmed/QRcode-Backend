const Joi = require('joi');
const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const timespan = require('jsonwebtoken/lib/timespan');

const schema=new mongoose.Schema({
  name:{type:String,required:true,maxlength:35},
  degree:{type:String,required:true,minlength:1,maxlength:35},
  department:{type:String,required:true,minlength:1,maxlength:35},
  military_number:{type:String,required:true},
  phone_number:{type:String,required:true},
  email:{type:String,required:true,unique:true,minlength:2,maxlength:60},
  password:{type:String,required:true,minlength:1,maxlength:1025},
  isadmin:{type:Boolean ,default:false},
  
  })
schema.methods.generateTokens=function(){
    var token = jwt.sign({ _id:this._id,isadmin:this.isadmin }, 'privatekey');
return token;
}

const User=mongoose.model("User",schema)


function uservaliaded(user){
    const schema=Joi.object({
      name:Joi.string().min(1).required(),
      degree:Joi.string().min(1).required(),
      department:Joi.string().min(1).required(),
      military_number:Joi.string().min(5).required(),
      phone_number:Joi.string().min(10).required(),
      email:Joi.string().min(2).required(),
      password:Joi.string().min(2).required(),
      isadmin:Joi.boolean()
     
    });
    return schema.validate(user);
  
  }
exports.User=User
exports.uservaliaded=uservaliaded