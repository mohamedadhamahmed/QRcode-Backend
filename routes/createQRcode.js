const express=require('express')
const router=express.Router()
const Joi = require('joi');
const mongoose=require('mongoose');
const { Create_Room,createroom_valiaded } = require('../model/createQRcode');
const { v4: uuidV4 } = require('uuid')
const auth = require('../middleware/auth');
var ObjectId = require('mongodb').ObjectID;



router.get('/',async(req, res)=> {

  var id = mongoose.Types.ObjectId(req.query.id)

  let qrcode=await Create_Room.findById( id );
  console.log(qrcode)
    res.json(qrcode);
  });

 

  // Delete user
router.put('/', async(req, res) =>{ 
  var myquery = { _id: req.query.id };
  var newvalues = { $set: {isused: true } };
  let qrcode=await Create_Room.updateOne(myquery, newvalues,{ upsert: true });
console.log(qrcode);
res.json(qrcode.isused);
  });
  router.post('/',async(req,res)=>{
  
    const {error}=createroom_valiaded(req.body);
    //console.log("inside error"+error.details[0].message)

    if(error){
      console.log(error);
      console.log(" error :"+error.details[0].message)
    
      return res.status(404).send(error.details[0].message)
    }


    const create_room=await new Create_Room({
      visitor:req.body.visitor,
      visitReason:req.body.visitReason,
      place:req.body.place,
      isused:req.body.isused,
      creator:req.body.creator
    });
      const create_room_db=await create_room.save();
      console.log(create_room)
      console.log('create_room')
      console.log(create_room_db)
      
res.send(create_room['_id'].toString())
;
  }

  
 )


 module.exports=router;