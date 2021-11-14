const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'csvfile');
  },
  filename: (req,file,cb)=>{
    cb(null, file.originalname);
  }
})

const fileFilter = (req,file,cb) =>{
  if(file.mimetype === 'text/csv'){
    cb(null,true);
  }
  else {
    cb(null,false);
  }
}


module.exports = multer({storage, fileFilter}).single('file');
