const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    account:{
        type:String,
        required:true
    },
    author:{
        type:Object,
        required:true
    }
})

module.exports = mongoose.model('quotes', userschema)