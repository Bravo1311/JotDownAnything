const mongoose = require('mongoose')
const DB = require('./connection.js')
const express = require('express')
require('dotenv').config()
// const cors = require('cors')
const app = express()
// app.use(cors())

const port = process.env.port || 5000

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials','true')
//     res.header('Access-Control-Allow-Headers', 
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     // if( req.method === 'OPTIONS'){
//       req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     //   return res.status(200).json({});
//     // }
//     next();
//   });
app.use(express.json())

mongoose.connect(DB).then(()=>{
    console.log('db connected')
}).catch((error)=>{
    console.log(error)
})

const con = mongoose.connection

const userrouter =  require('./routers/users')
app.use(userrouter)


// con.on('open',)

if(process.env.NODE_ENV=='production'){
    app.use(express.static("jotdownfrontend - Copy/build"))
}

app.listen(port,()=>{
    console.log('server started')
})