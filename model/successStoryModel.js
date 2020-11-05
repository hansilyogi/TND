var mongoose = require('mongoose');

var successStorySchema = mongoose.Schema({
    headline: {
        type:String,
        require: true
    },
    storyImage: {
        type:String
    },
    storyContent: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("SuccessStory",successStorySchema);