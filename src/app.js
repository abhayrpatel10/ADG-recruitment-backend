const express=require('express')
const userroutes=require('./routes/user')
require('./db/mongoose')
app=express()
app.use(express.json())

app.use(userroutes)

const port=process.env.PORT||3000



app.listen(port,()=>{
    console.log('Listening on port : '+port)
})

