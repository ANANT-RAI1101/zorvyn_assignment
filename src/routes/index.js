const express=require("express")
const Route=express.Router();
const v1Route=require("./v1/index.js")

Route.use("/v1",v1Route);

module.exports=Route;