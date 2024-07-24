const mongoose = require("mongoose");
const child = new mongoose.Schema({
    url: {
      type:String,
      required:true

    },
    name: {
        type:String,
      required:true
     },
     age: {
        type:Number,
      required:true
     },
     gender:{
        type:String,
        required:true
     },
     hobbies:{
        type:String
     },
     desc:{
        type:String,
        required:true

     },
     orphanhoodReason:{
type:String,
required:true
     },
   

     


},{
    timestamps:true
}
)
module.exports=mongoose.model("children",child)