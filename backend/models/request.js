const mongoose = require("mongoose");
const request = new mongoose.Schema({
    user: {
       type:mongoose.Types.ObjectId,
       ref:"user"
    },
    child:{
        type:mongoose.Types.ObjectId,
        ref:"children"
    },
    status:{
        type:String,
        default:"Request made",
        enum:["Request made","Submitted for Approval","Request Approved for authentication","Request Denied"]
    }

},{
    timestamps:true
}
)
module.exports=mongoose.model("request",request)