import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {type : String , requried : true  , ref : 'user'},
    items : [{
         product : { type : String  , required : true , ref : 'product'},
         quantity : {type : Number , requried : true }
    }],
    amount : {type : Number , requried : true},
    address : {type : String , requried : true  , ref : 'address'},
    status : {type : String , default : "Order Placed" },
    paymentType : {type : String , requried : true  },
    isPaid : {type : Boolean , default : false },
},{timestamps  :true })


const Order = mongoose.models.order || mongoose.model('order' , orderSchema)

export default Order