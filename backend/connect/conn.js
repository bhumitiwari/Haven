const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();
const conn=async()=>{
    try{
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to database");
    }
    catch(error)
    {
        console.log(error)
    }
}
conn();