const router=require("express").Router();
const user=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./user-auth");

router.post("/sign-up",async(req,res)=>{
    try{
const{username,email,password,address}=req.body;
if(username.length<5){
    return res.status(400).json({message:"Username length is less than 5 "})
}
const existingUsername=await user.findOne({username:username})
if(existingUsername){
    return res.status(400).json({message:"Username already exists "})
}
const existingEmail=await user.findOne({email:email})
if(existingEmail){
    return res.status(400).json({message:"Email already exists "})
}
const pattern=/^[A-Za-z._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
if(!pattern.test(email)){
    return res.status(400).json({message:"Invalid email "})
}


if(password.length<8){
    return res.status(400).json({message:"Password is is less than 8 characters "})
}
const hashpass= await bcrypt.hash(password,10)
const newUser=new user({
    username:username,
    email:email,
    password:hashpass,
    address:address

});
await newUser.save();
return res.status(200).json({message:"SignedUp successfully!"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
});
router.post("/sign-in",async(req,res)=>{
try{
const{username,password}=req.body;
const existingUser=await user.findOne({username});
if(!existingUser)
    res.status(400).json({message:"Invalid credentials"});

await bcrypt.compare(password,existingUser.password,(err,data)=>{
    if(data){
        const authClaims=[{
            name:existingUser
        },
    {
        role:existingUser.role
    }]

        
        const token=jwt.sign({authClaims},"request123",{expiresIn:"30d"})
        res.status(200).json({
            id:existingUser._id,
            role:existingUser.role,
            token:token
        })
    }
    else
    res.status(400).json({message:"Invalid credentials"})
})}
catch(error){

}
});
router.get("/get-user",authenticateToken,async(req,res)=>{
try{
const {id}=req.headers;
const data=await user.findById(id).select('-password');
return res.json(data);
}
catch(error){
    res.status(500).json({message:"Internal Server Error"})
}
});
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const{id}=req.headers;
const {address}=req.body;
await user.findByIdAndUpdate(id,{address:address});
return res.status(200).json({message:"Address updated successfully"})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
});

module.exports=router;