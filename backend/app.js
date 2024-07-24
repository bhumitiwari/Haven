const express=require("express");
const app=express();
const cors=require("cors");
require("./connect/conn")
require("dotenv").config();
const user=require("./routes/user");
const child=require("./routes/child");
const preferences=require("./routes/preference")
const requests=require("./routes/request")

const port =process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/v1",user)
app.use("/api/v1",child)
app.use("/api/v1",preferences)
app.use("/api/v1",requests)
app.listen(port,()=>
console.log(`Server started at port ${port}`))