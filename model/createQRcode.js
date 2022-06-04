const Joi = require('joi');
const mongoose=require('mongoose')


const Create_Room=mongoose.model("Create_QRcode",new mongoose.Schema({
  
  visitor:{type:mongoose.Schema.Types.Number,ref:"Visitors"},
  visitReason:{type:String,required:true},
  place:{type:String,required:true},
  isused:{type:Boolean ,default:false},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  generate_date: { type: Date, default: Date.now },



}))
function createroom_valiaded(create_room){
  const schema=Joi.object({
    
    visitor:Joi.number(),
    visitReason:Joi.string(),
    place:Joi.string().required(),
    isused:Joi.boolean(),
    creator:Joi.string(),

  });
  return schema.validate(create_room);

}


exports.Create_Room=Create_Room;
exports.createroom_valiaded=createroom_valiaded;