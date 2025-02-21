const { default: mongoose } = require("mongoose");
const moongoose=require("mongoose");
const UserSchema=new mongoose.Schema(
    {
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
},
{timestamps:true}
)
const URL=mongoose.model("URL",UserSchema);
module.exports=URL;