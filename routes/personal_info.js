var express = require('express');
var router = express.Router();
var fs = require('fs'); 
var path = require('path');
var multer = require('multer');
var model = require('../model/test.model');
const { json } = require('body-parser');
var cloudinary = require('cloudinary').v2;

var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, 'uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.originalname + '-' + Date.now()) 
  } 
}); 

var upload = multer({ storage: storage }); 

/* POST Personal Directory. */
router.post('/:name',upload.single('img'), function(req, res, next) {
  var name = req.params.name;
  console.log(name);

  const cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: 'dckj2yfap',
      api_key: '693332219167892',
      api_secret: 'acUf4mqnUBJCwsovIz-Ws894NGY'
    });
    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();
    console.log(path);
    console.log(uniqueFilename);

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err)
        console.log('file uploaded to Cloudinary');
        // remove file from server
        const fs = require('fs');
        fs.unlinkSync(path);
        // return image details
        var image_data = json(image);
        console.log(image_data);
        //res.json(image);
      }
    )

  var record = new model({
    date_of_birth : req.body.date_of_birth,
    gender : req.body.gender,
    address : req.body.address,
    spouse_name : req.body.spouse_name,
    spouse_birth_date : req.body.spouse_birth_date,
    number_of_child : req.body.number_of_child,
    img: { 
        data: 'https://res.cloudinary.com/dckj2yfap/image/upload/v1601267438/blog/'+uniqueFilename, 
        contentType: 'image/png'
      }
  });

  console.log(record);

  model.findOneAndUpdate({name:req.params.name},{
    date_of_birth : record.date_of_birth,
    gender : record.gender,
    address : record.address,
    spouse_name : record.spouse_name,
    spouse_birth_date : record.spouse_birth_date,
    number_of_child : record.number_of_child,
    img: { 
      data: 'https://res.cloudinary.com/dckj2yfap/image/upload/v1601267438/blog/'+uniqueFilename, 
      contentType: 'image/png'
    }
  },(err,record)=>{
    var result = {};
    if(err){
      result.Message= "Not Found.";
      result.Data = [];
      result.isSuccess = false;
      return res.status(404).json(result);
    }
    else{
      result.Message= "Found.";
      result.Data = record;
      result.isSuccess = true;
      return res.status(200).json(result);
    }
    //return res.json(result);
  });

});


module.exports = router;
