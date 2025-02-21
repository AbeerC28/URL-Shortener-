const express=require("express");
const router=express.Router();
const {handleGenerateNewShortId,handleGetAnalytics}=require("../controllers/url");

router.post("/",handleGenerateNewShortId);

router.get("/analytics/:shortId",handleGetAnalytics);
module.exports=router;
