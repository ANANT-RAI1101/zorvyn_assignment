const express = require("express")
const bodyParser = require("body-parser");
const {PORT}=require('./config/server-config');

const SetupAndStartServer = async()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT,async ()=>{
        console.log(`server running at port ${PORT}`)
    })
}

SetupAndStartServer();