var mongoose = require('mongoose');
Schema = mongoose.Schema;

var newSchema = mongoose.Schema({
    date_of_birth : { type: Date },
    gender : { type: String },
    address : { type: String },
    spouse_name : { type: String },
    spouse_birth_date : { type: Date },
    number_of_child : { type: Number },
});

module.exports = mongoose.model("personal_directory",newSchema);