const express=require('express');
const app=express();
var cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: false }));
const helmet = require("helmet");
var morgan = require('morgan')
app.use(express.json());
const Joi = require('joi');
const http = require('http');
const server = http.createServer(app)

const mongoose=require('mongoose')
const { v4: uuidV4 } = require('uuid')


const create=require("./routes/createQRcode.js");
const user=require("./routes/users.js");
const visitors=require("./routes/visitors.js");
const auth=require("./routes/auth.js");


mongoose.connect('mongodb://localhost/QRCode_System', {
  useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
      console.log("connected to database........")
  }).catch((e)=>{
     console.log(e) 
  });


  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
      console.log('Dejo pasar Cors');
    } else {
      return next();
    }
  });



app.use(cookieParser());
//app.use(middleware.log);
app.use('/create_QRcode',create)
app.use('/users',user)
app.use('/visitors',visitors)
app.use('/auth',auth)


app.use('*',(req,res,next)=>{
  res.status(404).json({
    status:false,
    message:"page not found"
  })
})

if(app.get('env')==='development')
{
  app.use(helmet());
  app.use(morgan('tiny'))
}


 
 
  const port=process.env.port||4000
  // server.listen(port)
  server.listen(port, () => {
    console.log("QR Code System  On localhost:4000");
  })
