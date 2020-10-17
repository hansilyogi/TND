var express = require('express');
const app = require('../app.js');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
const path = require('path');

newsDataSchema = require('../model/newsCategory.js');

var newImageData = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/newsPictures");   
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

var uploadNewsImg = multer({ storage: newImageData });

router.post('/adminlogin',async function(req,res,next){
    const { username , password } = req.body;

    try {
        if( req.body.username=="admin003" && req.body.password == "admin" ){
            res.status(201).json({ IsSuccess : true , Message : "Admin LoggedIn...!!!" });
        }else{
            res.status(500).json({ IsSuccess : false , Message : "Credential Mismatched...!!!" });
        }
    } catch (error) {
        res.status(400).json({ IsSuccess : false , Message : "Something Wrong...!!!" });
    }
});

router.post('/addnews', uploadNewsImg.single('newsImage'), async function(req,res,next){
    const { newsType , content , newsDate , headline , newsImage } = req.body;
    const file = req.file;
    //console.log(imageData);
    try {
        var newsData = await new newsDataSchema({
            newsType : newsType,
            content : content,
            newsDate : newsDate,
            headline : headline,
            newsImage : file.path
        });
        let newsDataStore = await newsData.save();
        console.log(newsDataStore);
        res.status(200).json({ Message: "News Added Successfully...!!!", Data: newsDataStore, IsSuccess: true });
    } catch (error) {
        res.status(400).json({ Message: "Something Wrong...!!!", IsSuccess: false });
    }
});

router.post('/updatenews', async function(req , res, next){
    const id = req.body.id;
    const file = req.file;
    const { newsType , content , newsDate , headline , newsImage } = req.body;
    try {
        let updateNewsData = {
            newsType : newsType,
            content : content,
            newsDate : newsDate,
            headline : headline,
            newsImage : file.path
        };
        console.log(updateNewsData);
        let data = await newsDataSchema.findByIdAndUpdate(id,updateNewsData);
        res.status(200).json({ Message: "News Data Updated!", Data: data, IsSuccess: true });
    } catch (error) {
        res.status(400).json({ Message: "Something Wrong...!!!", IsSuccess: false });
    }
});

router.post('/deletenews', async function(req,res,next){
    const id = req.body.id;
    try {
        let deleteNews = await newsDataSchema.findByIdAndDelete(id);
        if(deleteNews != null){
            res.status(200).json({ IsSuccess : true , Message : "Data Deleted...!!!" });
        }else{
            res.status(400).json({ IsSuccess : false , Message : "Data Not Found...!!!" });
        }        
    } catch (error) {
        res.status(500).json({ IsSuccess : false , Data : 0 , Message : "Something Wrong...!!!" });
    } 
});

module.exports = router;