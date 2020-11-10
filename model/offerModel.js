const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
    title: {
        type: String,
    },
    bannerImage: {
        type: String,
    },
    dateTime: {
        type: String,
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
    businessCategory: {
        type: mongoose.Types.ObjectId, ref: "UsersList",
    },
    offerExpire: {
        type: String
    },
    daysRemain: {
        type: String
    }
});

module.exports = mongoose.model("offer", offerSchema);