const shortid=require("shortid");
const URL=require("../models/url");

async function handleGenerateNewShortId(req,res){  
const allURLs=await URL.find({createdBy:req.user._id});
const body=req.body
const originalURL=body.url;
if(!body.url)
    return res.status(400).json({msg:"URL is required..!"});
const existingURL=await URL.findOne({redirectUrl:originalURL});
if(existingURL)
{
return res.render("home",{check:1,urls:allURLs});
}
const shortID=shortid();
await URL.create({
shortId:shortID,
redirectUrl:body.url,
visitHistory:[],
createdBy:req.user._id
});


return res.render("home",{id:shortID,urls:allURLs});
}
async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
         totalClicks:result.visitHistory.length,
        Analytics:result.visitHistory
    }
)
}
module.exports={
    handleGenerateNewShortId,handleGetAnalytics
}; 
