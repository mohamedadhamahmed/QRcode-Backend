const Joi = require('joi');
const mongoose=require('mongoose')


const schema=new mongoose.Schema({
  name:{type:String,required:true,minlength:1,maxlength:35},
  degree:{type:String,required:true,minlength:1,maxlength:35},
  unit:{type:String,required:true,minlength:1,maxlength:35},
  national_number:{type:Number,required:true},
  phone_number:{type:String,required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},

  })


const Visitors=mongoose.model("Visitors",schema)


function uservaliaded(visitor){
    const schema=Joi.object({
      name:Joi.string().min(1).required(),
      degree:Joi.string().min(1).required(),
      unit:Joi.string().min(1).required(),
      national_number:Joi.number().min(5).required(),
      phone_number:Joi.string().min(10).required(),
      creator:Joi.string()

     
    });
    return schema.validate(visitor);
  
  }
exports.Visitors=Visitors
exports.uservaliaded=uservaliaded