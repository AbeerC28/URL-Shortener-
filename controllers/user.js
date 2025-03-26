const User=require("../models/user.js");
const{setUser}=require("../service/auth.js");
const {v4:uuidv4}=require("uuid");
async function handleUserSignup(req,res){
const{name,email,password}=req.body;
await User.create({
    name,
    email,
    password,
});
return res.render("signup.ejs");
}
async function handleUserLogin(req,res){
const{email,password}=req.body;
const user=await User.findOne({email,password});
if(!user){
    return res.render("login",{
        "error":"Invalid email or password"
    }
    )
}
else{
    // const sessionId=uuidv4();
    // setUser(sessionId,user);
    // res.cookie("uid",sessionId);
    // return res.redirect("/");
    const token=setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}
}
module.exports={
    handleUserSignup,handleUserLogin
};