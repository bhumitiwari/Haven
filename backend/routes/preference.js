const router=require("express").Router();
const user=require("../models/user");
const {authenticateToken}=require("./user-auth");
router.put("/add-child-to-preference",authenticateToken,async(req,res)=>{
    try{
        const{childid,id}=req.headers;
       const userData= await user.findById(id);
       
const ispreferred=userData.preferences.includes(childid)

if(ispreferred)
  {  return res.status(200).json({message:"Child is already in preferences"});}
await user.findByIdAndUpdate(id,{$push:{preferences:childid}})
return res.status(200).json({message:"Child added to preferences"});
}
    catch(error){
return res.status(500).json({message:"Some error occurred"})
    }
})
router.put("/remove-child-from-preference",authenticateToken,async(req,res)=>{
    try{
        const{childid,id}=req.headers;
       const userData= await user.findById(id);
       
const ispreferred=userData.preferences.includes(childid)

if(!ispreferred)
  {  return res.status(200).json({message:"Child is not in preferences"});}

await user.findByIdAndUpdate(id,{$pull:{preferences:childid}})
return res.status(200).json({message:"Child removed from preferences"});
}
    catch(error){
return res.status(500).json({message:"Some error occurred"})
    }
})
router.get("/get-preferred-children",authenticateToken,async(req,res)=>{
    try{const{id}=req.headers;
    const userData= await user.findById(id).populate("preferences");
    const preferredChildren=userData.preferences;
    return res.json({
status:"Success",
data:preferredChildren

    })
    console.log("returned favourites")
}
       
    catch (error) {
        res.status(500).json({ message: "Some error occurred" })
    }
})




module.exports=router;