const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
    title: {
        type: String,
    },
    bannerImage: {
        type: String,
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
    type:{
        type: String,
    },
    details: {
        type: String,
    },
    redeemBy: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    newsCategory: {
        type: mongoose.Types.ObjectId, ref: "NewsCategory",
    },
    offerExpire: {
        type: String
    }
});

module.exports = mongoose.model("offer", offerSchema);