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
    todos:{
        type:Array,
        required:true
    },
    // _id:{
    //     type:String,
    //     required:true
    // }
})

module.exports = mongoose.model('todos', userschema)