const File = require("../models/file");
const csvtojson = require('csvtojson');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

exports.adminLoginController = async (req,res,next) => {
  // username for admin is SHIVAM
  // PASSWORD IS 1234
  try {
    const { adminUsername, adminPassword } = req.body;
    console.log(adminUsername, adminPassword);
    if(adminUsername === 'SHIVAM' && adminPassword === '1234'){
      const token = jwt.sign({ adminUsername: adminUsername }, 'somesupersecretsecretvcvxcvxcvcxvxc', {expiresIn: '1h'});
      return res.status(401).json({ message: 'admin logged in successfully', token: token });
    } else {
      const error = new Error('incorrect username or password');
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
      if(!err.statusCode) {
        console.log(err.statusCode);
        err.statusCode=500;
      }
      next(err);
  }

}

exports.fileUploadController = async (req,res,next)=>{
  try{
    if(!req.file){
      console.log('failed, file not fetched');
      const error = new Error("file format is not csv");
      error.statusCode = 401;
      throw error;
    }
    const data = await csvtojson().fromFile(req.file.path);
    // res.json({message: data });
    await File.insertMany(data);
    
      return res.json({message: data });
  } catch (err) {
    if(!err.statusCode) {
      console.log(err.statusCode);
      err.statusCode=500;
    }
    next(err);
}
}

exports.createRecordController = async (req,res,next)=>{
  const errors=validationResult(req);
  const { userId, email, firstname, lastname } = req.body;
  console.log(userId, email, firstname, lastname);
  try {
    if(!errors.isEmpty()){
      const error=new Error('Validation failed');
      error.statusCode=422;
      error.data=errors.array();
      throw error;
    }
    const record = new File ({
      username: userId,
      email: email,
      firstname: firstname,
      lastname: lastname
    });
    await record.save();
    return res.status(201).json({ message: "record saved successfully", data: record })
  } catch (err) {
    if(!err.statusCode) {
      console.log(err.statusCode);
      err.statusCode=500;
    }
    next(err);
}
}

exports.readRecordController = async (req,res,next)=>{
  const { userId } = req.query;
  console.log(userId);
  try {
    const record = await File.findOne({ username: userId })
    if(record)
      return res.status(201).json({ message: "record found with userId", data: record });
    else {
      const error = new Error("No record exist for this userId");
      error.statusCode=401;
      throw error;
    }
  } catch (err) {
    if(!err.statusCode) {
      console.log(err.statusCode);
      err.statusCode=500;
    }
    next(err);
}
}

exports.updateRecordController = async (req,res,next)=>{
  const errors=validationResult(req);
  const {userId} = req.query;
  const { updatedUserId, updatedEmail, updatedFirstname, updatedLastname } = req.body;
  console.log(updatedUserId, updatedEmail, updatedFirstname, updatedLastname);
  try {
      if(!errors.isEmpty()){
        const error=new Error('Validation failed');
        error.statusCode=422;
        error.data=errors.array();
        throw error;
      }
    const record = await File.findOne({ username: userId })
    if(record){
      record.username = updatedUserId;
      record.email = updatedEmail;
      record.firstname = updatedFirstname;
      record.lastname = updatedLastname;
      await record.save();
      return res.status(201).json({ message: "record updated successfully", data: record });
    }
    else {
      const error = new Error("No record exist for this userId")
      error.statusCode=404;
      throw error;
    }
  } catch (err) {
    if(!err.statusCode) {
      console.log(err.statusCode);
      err.statusCode=500;
    }
    next(err);
}
}

exports.deleteRecordController = async (req,res,next)=>{
  const { userId } = req.query;
  console.log(userId);
  try {
    const record = await File.deleteOne({ username: userId })
    if(record)
      return res.status(201).json({ message: "record deleted successfully", data: record });
    else {
      const error = new Error("No record exist for this userId")
      error.statusCode=401;
      throw error;
    }

  } catch (err) {
    if(!err.statusCode) {
      console.log(err.statusCode);
      err.statusCode=500;
    }
    next(err);
}
}
