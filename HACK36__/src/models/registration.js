//define schema
const mongoose = require("mongoose");


const customerSchema= new mongoose.Schema({
    Name:{
        type:String,
        // required:true
    },
    UserName:{
        type:String,
        // required:true
    },
    // age likha bas h yeh password hi 
    age:{
       type: String,
    //    required:true
    
    },
    // similariy gender bhi bas re password h 
    gender:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true,
        // unique:true
 
    },
    fileName:[{
        type:String
        }]

})
const registration = new mongoose.model("registration",customerSchema);

// now export it 
module.exports= registration;