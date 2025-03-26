// const sessonIdToUserMap= new Map();
// function setUser(id,user){
//     sessonIdToUserMap.set(id,user);
// }
// function getUser(id){
//     return sessonIdToUserMap.get(id);
// }
const jwt=require("jsonwebtoken");
const secret="Abeer2810";
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email
    },secret);
}

function getUser(token){
    if(!token)
        return null;
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
    
}
module.exports={setUser,getUser};