const mongoose=require('mongoose');
const otpSchema=new mongoose.Schema({
    otpcode:{
        type:String
    },
    email:{
        type:String
    },
    expiresIn:{
        type:Number
    },
})
module.exports=mongoose.model("Otp",otpSchema)