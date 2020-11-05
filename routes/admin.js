var express = require('express');
const app = require('../app.js');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
const path = require('path');

newsDataSchema = require('../model/newsCategory.js');
var bannerSchema = require('../model/bannerModel');
var offerSchema = require('../model/offerModel');

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

var bannerlocation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/banners");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

var offerBannerlocation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/offer");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

var uploadNewsImg = multer({ storage: newImageData });
var uploadbanner = multer({ storage: bannerlocation });
var uploadOfferbanner = multer({ storage: offerBannerlocation });

router.post('/adminlogin',async function(req,res,next){
    const { username , password } = req.body;

    try {
        if( req.body.username=="admin003" && req.body.password == "admin" ){
            res.status(201).json({ IsSuccess : true , Data: 1 , Message : "Admin LoggedIn...!!!" });
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
        if(req.file){
            var newsData = await new newsDataSchema({
                newsType : newsType,
                content : content,
                newsDate : newsDate,
                headline : headline,
                newsImage : file.path
            });
        }else{
            newsData = await new newsDataSchema({
                newsType : newsType,
                content : content,
                newsDate : newsDate,
                headline : headline
            });
        }
        
        let newsDataStore = await newsData.save();
        console.log(newsDataStore);
        res.status(200).json({ Message: "News Added Successfully...!!!", Data: [newsDataStore], IsSuccess: true });
    } catch (error) {
        res.status(400).json({ Message: "Something Wrong...!!!", IsSuccess: false });
    }
});

router.post('/updatenews', async function(req , res, next){
    console.log(req.body);
    const id = req.body.id;
    //const file = req.file;
    const { newsType , content , headline } = req.body;
    try {
        if(req.file){
            var updateNewsData = {
                newsType : newsType,
                content : content,
                headline : headline,
            };
        }else{
            updateNewsData = {
                newsType : newsType,
                content : content,
                headline : headline
            };
        }
        console.log(updateNewsData);
        let data = await newsDataSchema.findByIdAndUpdate(id,updateNewsData);
        res.status(200).json({ Message: "News Data Updated!", Data: [data], IsSuccess: true });
    } catch (error) {
        res.status(400).json({ Message: "Something Wrong...!!!", IsSuccess: false });
    }
});

router.post('/deletenews', async function(req,res,next){
    const id = req.body.id;
    try {
        let deleteNews = await newsDataSchema.findByIdAndDelete(id);
        if(deleteNews != null){
            res.status(200).json({ IsSuccess : true , Data: 1 , Message : "Data Deleted...!!!" });
        }else{
            res.status(400).json({ IsSuccess : false , Message : "Data Not Found...!!!" });
        }        
    } catch (error) {
        res.status(500).json({ IsSuccess : false , Data : 0 , Message : "Something Wrong...!!!" });
    } 
});

router.post("/addBanner" , uploadbanner.single("image"), async function(req,res,next){
    const { title, type } = req.body;
    
    try {
        const file = req.file;
        let newbanner = new bannerSchema({
            title: title,
            type: type,
            image: file == undefined ? null : file.path,
        });
        await newbanner.save();
        res
            .status(200)
            .json({ Message: "Banner Added!", Data: 1, IsSuccess: true });
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false,
        });
    }
});

router.post("/offer" , uploadOfferbanner.single("bannerImage") , async function(req,res,next){
    const { title , bannerImage , dateTime , type , details ,redeemBy } = req.body;
    try {
        const file = req.file;
        var record = await new offerSchema({
            title: title,
            type: type,
            details: details,
            redeemBy: redeemBy,
            bannerImage: file == undefined ? null : file.path,
        });
        await record.save();
        if(record){
            res.status(200)
               .json({ IsSuccess: true , Data: [record] , Message: "Offer Added" });
        }else{
            res.status(400)
               .json({ IsSuccess: true , Data: 0 , Message: "Offer not Added" });
        }
    } catch (error) {
        res.status(500)
           .json({
               IsSuccess: false,
               Data: 0,
               Message: error.message
           });
    }
});

router.post("/updateOffer" , async function(req,res,next){
    var {  id, title , bannerImage , dateTime , type , details ,redeemBy } = req.body;
    console.log(req.body);
    try {
        //const file = req.file;dateTime
        // var existOffer = await offerSchema.find();
        //var record;
        var ExistData = await offerSchema.find({ _id: id });
        if(ExistData.length == 1){
            var record = await offerSchema.findByIdAndUpdate( id ,{
                title: title,
                type: type,
                details: details,
                redeemBy: redeemBy,
                //bannerImage: file == undefined ? null : file.path,
            });
        }
        
        // console.log(record);
        
        if(record){
            res.status(200)
               .json({ IsSuccess: true , Data: [record] , Message: "Offer Updated" });
        }else{
            res.status(400)
               .json({ IsSuccess: true , Data: 0 , Message: "Offer not Update" });
        }
    } catch (error) {
        res.status(500)
           .json({
               IsSuccess: false,
               Data: 0,
               Message: error.message
           });
    }
});

router.post("/deleteOffer" , async function(req,res,next){
    const id = req.body.id;
    try {
        //const file = req.file;dateTime
        // var existOffer = await offerSchema.find();
        //var record;
        var ExistData = await offerSchema.find({ _id: id });
        if(ExistData.length == 1){
            var record = await offerSchema.findByIdAndDelete(id);
        }
        
        if(record){
            res.status(200)
               .json({ IsSuccess: true , Data: [record] , Message: "Offer Deleted" });
        }else{
            res.status(400)
               .json({ IsSuccess: true , Data: 0 , Message: "Offer not Delete" });
        }
    } catch (error) {
        res.status(500)
           .json({
               IsSuccess: false,
               Data: 0,
               Message: error.message
           });
    }
});

router.post("/getOffer" , async function(req,res,next){
    try {
        var record = await offerSchema.find();
        if(record){
            res.status(200).json({ IsSuccess: true , Data: [record] , Message: "Offers Found" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "No Offer" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

module.exports = router;