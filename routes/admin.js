var express = require('express');
const app = require('../app.js');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
const path = require('path');

var newsCategorySchema = require('../model/newsCategory.js');
var bannerSchema = require('../model/bannerModel');
var offerSchema = require('../model/offerModel');
var newsModelSchema = require('../model/newsModel');
var successStorySchema = require('../model/successStoryModel');
var eventSchema = require('../model/eventModel');
const bannerModel = require('../model/bannerModel');
const { off } = require('../app.js');

var newCategoryImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/newsCategoryPic");   
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

var newsImage = multer.diskStorage({
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

var successStorylocation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/successStory");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

var eventlocation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/eventsPic");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

var uploadCategoryImg = multer({ storage: newCategoryImage });
var uploadNewsImg = multer({ storage: newsImage });
var uploadbanner = multer({ storage: bannerlocation });
var uploadOfferbanner = multer({ storage: offerBannerlocation });
var uploadSuccessStory = multer({ storage: successStorylocation });
var uploadEvent = multer({ storage: eventlocation });

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

router.post("/addNewsCategory" , uploadCategoryImg.single("categoryImage") , async function(req,res,next){
    const { newsType , newsDate , categoryImage } = req.body;
    const file = req.file;
    try {
        var record = await new newsCategorySchema({
            newsType: newsType,
            newsDate: newsDate,
            categoryImage: file == undefined ? null : file.path,
        });
        if(record){
            res.status(200).json({ IsSuccess: true , Data: [record] , Message: "News Category Added" });
            await record.save();
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "News Category Not Added"});
        }
    } catch (error) {
        res.status(500).json({ Message: error.message , IsSuccess: false });
    }
});

router.post("/getNewsCategory" , async function(req,res,next){
    try {
        var record = await newsCategorySchema.find();
        if(record){
            res.status(200).json({ IsSuccess: true , Data: record , Message: "News Category Found" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "No Category Available" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post('/addnews', uploadNewsImg.single('newsImage'), async function(req,res,next){
    const { newsType , content , newsDate , headline , newsImage , trending , bookmark} = req.body;
    const file = req.file;
    //console.log(imageData);
    try {
        var newsData;
        if(req.file){
            newsData = await new newsModelSchema({
                newsType : newsType,
                content : content,
                //newsDate : newsDate,
                headline : headline,
                newsImage : file.path
            });
        }else{
            newsData = await new newsModelSchema({
                newsType : newsType,
                content : content,
                //newsDate : newsDate,
                headline : headline
            });
        }
        
        let newsDataStore = await newsData.save();
        console.log(newsDataStore);
        res.status(200).json({ Message: "News Added Successfully...!!!", Data: [newsDataStore], IsSuccess: true });
    } catch (error) {
        res.status(400).json({ Message: error.message, IsSuccess: false });
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
        let data = await newsModelSchema.findByIdAndUpdate(id,updateNewsData);
        res.status(200).json({ Message: "News Data Updated!", Data: data, IsSuccess: true });
    } catch (error) {
        res.status(400).json({ Message: error.message , IsSuccess: false });
    }
});

router.post('/deletenews', async function(req,res,next){
    const id = req.body.id;
    try {
        let deleteNews = await newsModelSchema.findByIdAndDelete(id);
        if(deleteNews != null){
            res.status(200).json({ IsSuccess : true , Data: 1 , Message : "Data Deleted...!!!" });
        }else{
            res.status(400).json({ IsSuccess : false , Message : "Data Not Found...!!!" });
        }        
    } catch (error) {
        res.status(500).json({ IsSuccess : false , Data : 0 , Message : error.message });
    } 
});

router.post("/getAllNews" , async function(req,res,next){
    try {
        var record = await newsModelSchema.find();
        if(record){
            res.status(200).json({ IsSuccess: true , Data: [record] , Message: "News Found" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "No News Available" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
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

router.post("/getAllBanner" , async function(req,res,next){
    try {
        var record = await bannerModel.find();
        if(record){
            res.status(200).json({ IsSuccess: true , Data: [record] , Message: "Banner Found" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "No Banner Available" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post("/offer" , uploadOfferbanner.single("bannerImage") , async function(req,res,next){
    const { title , bannerImage , newsCategory , dateTime , type , details ,redeemBy , offerExpire } = req.body;
    var expire = moment(offerExpire);
    expire = expire.utc().format('YYYY-MM-DD');

    try {
        const file = req.file;
        var record = await new offerSchema({
            title: title,
            type: type,
            details: details,
            redeemBy: redeemBy,
            bannerImage: file == undefined ? null : file.path,
            offerExpire: expire,
            newsCategory: newsCategory,
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
               .json({ IsSuccess: true , Data: record , Message: "Offer Updated" });
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
               .json({ IsSuccess: true , Data: record , Message: "Offer Deleted" });
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
        var record = await offerSchema.find().populate("newsCategory");
        if(record){
            res.status(200).json({ IsSuccess: true , Data: record , Message: "Offers Found" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "No Offer" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post("/addSuccessStory" , uploadSuccessStory.single("storyImage") , async function(req,res,next){
    const { headline , storyImage , storyContent , favorite , date } = req.body; 
    const file = req.file;
    try {
        var record = await new successStorySchema({
            headline: headline,
            storyImage: file == undefined ? " " : file.path,
            storyContent: storyContent,
            favorite: favorite,
            date: date,
        });
        if(record){
            res.status(200).json({ IsSuccess: true , Data: [record] , Message: "Success Story Added" });
            await record.save();
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "Story Not Added" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post("/getSuccessStory" , async function(req,res,next){
    try {
        var record = await successStorySchema.find();
        console.log(record);
        if(record){
            res.status(200).json({ IsSuccess: true , Data: record , Message: "Success Story Found" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "Story Not found" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post("/addEvent" , uploadEvent.single("eventImage") , async function(req,res,next){
    const { eventName , eventImage , eventOrganiseBy , startDte , endDate } = req.body; 
    const file = req.file;
    try {
        var record = await new eventSchema({
            eventName: eventName,
            eventImage: file == undefined ? null : file.path,
            eventOrganiseBy: eventOrganiseBy,
            startDte: startDte,
            endDate: endDate,
        });
        //console.log(record);
        if(record){
            res.status(200).json({ IsSuccess: true , Data: [record] , Message: "Event Added" });
            await record.save();
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "Event Not Added" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post("/getEvents" , async function(req,res,next){
    try {
        var record = await eventSchema.find();
        console.log(record);
        if(record){
            res.status(200).json({ IsSuccess: true , Data: record , Message: "Events Found" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "Events Not found" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});



module.exports = router;