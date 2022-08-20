const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    quotes:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('quotes', userschema)