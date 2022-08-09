const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    username: {
        required: true,
        type: 'string',
    },
    password: {
        required: true,
        type: 'string',
    }
},
{ 
    timestamps: true 
})

module.exports = mongoose.model('user', LoginSchema);