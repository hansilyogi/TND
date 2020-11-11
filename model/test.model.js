var mongoose = require('mongoose');
Schema = mongoose.Schema;

var newSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    company_name: { type: String },
    referred_by: { type: String },
    date_of_birth : { type: String },
    gender : { type: String },
    address : { type: String },
    spouse_name : { type: String },
    spouse_birth_date : { type: String },
    number_of_child : { type: Number },
    img : { 
        type: String,
        default: "/uploads/users/default-profile.jpg", 
    },
    keyword : [{ type: String }],
    business_category : { 
        type: mongoose.Types.ObjectId,
        ref: "BusinessCategory"
    },
    experience : { type:String },
    about_business : { type:String },
    achievement : { type:String },
    status : { type:String }
});

module.exports = mongoose.model("UsersList",newSchema);