const mongoose=require("mongoose");
const DB=process.env.DB;
const conn=async()=>{
    try{
await mongoose.connect(DB);
console.log("Connected to database");
    }
    catch(error)
    {
        console.log(error)
    }
}
conn();