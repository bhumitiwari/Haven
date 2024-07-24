const router = require("express").Router();
const Child = require("../models/children");
const Request = require("../models/request");
const { authenticateToken } = require("./user-auth");
const User = require("../models/user");
router.post("/request", authenticateToken, async (req, res) => {
    try {const {request} =req.body;
        const { id ,childid} = req.headers;
        const userData= await User.findById(id);
       
        const isrequested=userData.requests.includes(childid)
        
        if(isrequested)
          {  return res.status(200).json({message:"Already requested for adoption"});}
       const newRequest= new Request({user:id,child:childid})
       const requestDatafromDb=await newRequest.save();
       
await User.findByIdAndUpdate(id,{
    $push:{requests:requestDatafromDb._id}
})
await User.findByIdAndUpdate(id,{
    $pull:{preferences:requestDatafromDb._id}
})
return res.json({
    status:"Success",
    message:"Request made successfully"
})}
        catch (error) {
        console.log(error)
        res.status(500).json({ message: "Some error occurred in the making request" })
    }

}
)
router.get("/get-request-history",authenticateToken,async(req,res)=>
{
    try{
        const{id}=req.headers;
        const userData= await User.findById(id).populate({
            path:"requests",populate:{
                path:"child"
            }
        });
        const requestsData=userData.requests.reverse();
        return res.json({
            status:"Success",
data:requestsData
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Some error occurred in the get request history part"})
    }
})
router.get("/get-all-requests",authenticateToken,async(req,res)=>
    {
        try{
            
            const userData= await Request.find().populate({
              
                    path:"child"
                }
            ).populate({
                path:"user"
            }).sort({
createdAt:-1
            });
           return res.json({
                status:"Success",
    data:userData
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message:"Some error occurred in the get all requests part"})
        }
    })
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try{
        const{id}=req.params;
        await Request.findByIdAndUpdate(id,{status:req.body.status})
return res.json({
    status:"Success",
    message:"Status updated successfully"
})
    }
    catch(error){
console.log(error)
return res.status(500).json({message:"Some error occurred in the update status part"})
    }
})




module.exports = router;