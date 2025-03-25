const sessonIdToUserMap= new Map();
function setUser(id,user){
    sessonIdToUserMap.set(id,user);
}
function getUser(id){
    return sessonIdToUserMap.get(id);
}
module.exports={setUser,getUser};