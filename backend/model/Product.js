const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    Name: {
        required: true,
        type: 'string',
    },
    Description: {
        required: true,
        type: 'string',
    },
    Price: {
        required: true,
        type: 'string',
    },
    Image: {
        required: true,
        type: 'string',
    },
    cart : [{ type: Schema.Types.ObjectId, ref: "Cart" }]
},
{ 
    timestamps: true 
})

module.exports = mongoose.model('Product', ProductSchema);

