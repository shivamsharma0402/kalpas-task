const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
require('dotenv').config();

console.log(process.env.MONGO_USER);


const fileUpload = require('./config/multer');
const errorHandler = require('./config/errorHandler');


const userRoutes = require('./routes/user.routes');



const app = express();

app.use(bodyParser.json());

app.use(fileUpload);
console.log('dsadasds');


console.log("=============== server starts ===================");

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
});


app.use('/', userRoutes);

app.use(errorHandler);



mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hfqxk.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`)
.then(result=>{
  app.listen(process.env.PORT || 3000);
  console.log('DB connected')
}).catch(err=>{
  console.log(err);
});

