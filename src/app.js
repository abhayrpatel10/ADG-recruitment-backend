const express=require('express')
const userroutes=require('./routes/user')
require('dotenv').config();
require('./db/mongoose')
app=express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(bodyParser.json());
app.use(userroutes)

const port=process.env.PORT||3000
console.log(process.env.DB_USERNAME)



app.listen(port,()=>{
    console.log('Listening on port : '+port)
})

