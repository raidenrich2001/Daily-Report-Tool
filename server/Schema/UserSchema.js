var mongoose=require('mongoose');

let UserSchema=new mongoose.Schema({
    name:String,
    empid:String,
    password:String,
    department:String,
    testing:String,
    development:String,
    designing:String
});

module.exports=mongoose.model('UserSchema',UserSchema)