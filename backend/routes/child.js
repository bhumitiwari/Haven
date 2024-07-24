const router = require("express").Router();
const Child = require("../models/children");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./user-auth");
router.post("/add-child", authenticateToken, async (req, res) => {
    try {
        const{id}=req.headers;
       const user= await User.findById(id);
       if(user.role!="admin"){
        return res.status(400).json({message:"You are not allowed to add the child details"})
       }
        const child = new Child({
            url: req.body.url,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            hobbies: req.body.hobbies,
            desc: req.body.desc,
            orphanhoodReason: req.body.orphanhoodReason,
        })
        await child.save();
        res.status(200).json({ message: "Child added successfully!" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})
router.put("/update-child",authenticateToken,async(req,res)=>{
    try{
        const{childid}=req.headers;
        await Child.findByIdAndUpdate(childid,{
            url: req.body.url,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            hobbies: req.body.hobbies,
            desc: req.body.desc,
            orphanhoodReason: req.body.orphanhoodReason
        
        });
        res.status(200).json({message:"Child details updated successfully!"
        })
    }
    catch (error) {
        res.status(500).json({ message: "Some error occurred" })
    }
})
router.delete("/delete-child",authenticateToken,async(req,res)=>{
    try{
        const{childid}=req.headers;
        await Child.findByIdAndDelete(childid)
           
        
        
        res.status(200).json({message:"Child details deleted successfully!"})
    }
    catch (error) {
        res.status(500).json({ message: "Some error occurred" })
    }
})
router.get("/get-children",async(req,res)=>{
    try{
        const children =await Child.find().sort({createdAt:-1})
        return res.json({
            status:"Success",
            data:children
        })}
    catch (error) {
        res.status(500).json({ message: "Some error occurred" })
    }
})
router.get("/get-child-by-id/:id",async(req,res)=>{
    try{const { id }=req.params;
        const child =await Child.findById(id)
        return res.json({
            status:"Success",
            data:child
        })}
    catch (error) {
        res.status(500).json({ message: "Some error occurred" })
    }
})

        
   

module.exports = router;