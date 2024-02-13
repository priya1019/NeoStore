const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        unique:true
    },
    category_image:{
      type:String,
      required:true
    },
    created_at:{
      type:Date,
      default:Date.now
    }
})
module.exports=mongoose.model('Category',categorySchema);