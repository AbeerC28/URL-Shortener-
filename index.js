const express=require("express");
const connectToMongo=require("./connection");
const PORT=8001;
const app=express();
const path=require("path");
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user.js");
const URL=require("./models/url");
const cookieParser=require("cookie-parser");
const {restrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth.js");
connectToMongo("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("MongoDB connected")
});
//middleware for parsing
app.use(express.json());
//middleware for supporting form data
app.use(express.urlencoded({extended:false}));
//for using cookie parser
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
// app.get("/test",async (req,res)=>{
// const allURLs=await URL.find({});
// return res.render("home.ejs",{urls:allURLs});
// });
app.use("/",checkAuth,staticRoute);
app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",userRoute);
app.get("/url/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
            shortId
        },
        {
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            },
        },
        },
    );
 res.redirect(entry.redirectUrl);
})
app.listen(PORT,()=>{console.log(`Server started at PORT:${PORT}`)});