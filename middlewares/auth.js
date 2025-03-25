const {getUser}=require("../service/auth.js");
async function restrictToLoggedinUserOnly(req,res,next){
    
const UserUid=req.cookies?.uid;
if(!UserUid){
    return res.redirect("/login");
}
const user=getUser(UserUid);
if(!user){
   return res.redirect("/login");
}
req.user=user;
next();
}
async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    
    const user = getUser(userUid);
  
    req.user = user;
    next();
  }
module.exports={restrictToLoggedinUserOnly,checkAuth};
