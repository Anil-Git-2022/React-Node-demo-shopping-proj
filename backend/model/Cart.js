const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    product_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    quantity: {
        required: true,
        type: 'string',
    }
},
{ 
    timestamps: true 
})

module.exports = mongoose.model('Cart', CartSchema);