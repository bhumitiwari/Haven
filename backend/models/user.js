
const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://tse1.mm.bing.net/th?id=OIP.PKlD9uuBX0m4S8cViqXZHAHaHa&pid=Api&P=0&h=180"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    preferences:[{
        type:mongoose.Types.ObjectId,
        ref:"children"
    }],
    requests:[{
type:mongoose.Types.ObjectId,
ref:"request"
    }]


},{timestamps:true}
);
module.exports=mongoose.model("user",user)