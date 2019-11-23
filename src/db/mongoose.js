const mongoose=require('mongoose')
//connection to the database

mongoose.connect('mongodb://abhay:adg1234@ds017432.mlab.com:17432/adg-rec',{
    useNewUrlParser:true,
    useCreateIndex:true
})