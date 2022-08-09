const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    my_orders: [
        {
          quantity: String,
          productName: String,
          price : String,
          purchase_date : String,
          payment_method : String,
          image_path : String,
        }
    ],
},
{ 
    timestamps: true 
})

module.exports = mongoose.model('Order', OrderSchema);