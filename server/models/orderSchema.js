const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
   
    total:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
       
    },
    items:{
        type:Array
    },
    selectaddr:{
        type:Object
    },
    Orderno: {
        type: Number,
        required:true
       
    },
    checkout:{
        type: Boolean,
           
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("order", orderSchema);