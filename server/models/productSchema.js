const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
    productName:{
        type:String,
        required:true,
        
    },
    productImage:{
      type:String,
      required:true
    },
    productDescrip:{
        type:String,
        required:true
      },
      productProducer:{
        type:String,
        required:true
      },
      productStock:{
        type:Number,
        required:true
      },
      productRating:{
        type:Number,
        required:true
      },
    productCost:{
        type:Number,
        required:true
      },
      productDimension:{
        type:String,
        required:true
      },
      productMaterial:{
        type:String,
        required:true
      },
      subimages:[

      ]
      ,
      colorId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Color"
      },

      categoryId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Category"
      },
      created_at:{
        type:Date,
        default:Date.now
      }
 
})

module.exports = mongoose.model('Product', productSchema)