const express=require('express')
const router= new express.Router()
const nodemailer=require('nodemailer')
const User=require('../models/user')
const mongoose=require('mongoose')
const auth=require('../middleware/auth')



router.post('/signup',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        
       
        var transporter=nodemailer.createTransport({
            service:'gmail.com',
            auth:{
                user:'alandwayne90@gmail.com',
                pass:'niggerswithattitude'
            }
        })

        var mailOptions={
            from:'alandwayne90@gmail.com',
            to:req.body.email,
            subject:'verification',
            text:'Click this link to verify your account\n '+ 'http://localhost:3000/verify/'+user._id
        }
        
        transporter.sendMail(mailOptions,function(err,response){
            if(err){
                console.log(err)
                res.status(400).send('Error in sending email')
            }else{
                console.log('mail sent successfully')
                res.status(200).send({name:user.name,email:user.email})
            }
        })
        


    }catch(e){
        res.status(400).send(e)
    }
    


})

router.post('/resend',async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    var transporter=nodemailer.createTransport({
        service:'gmail.com',
        auth:{
            user:'alandwayne90@gmail.com',
            pass:'niggerswithattitude'
        }
    })

    var mailOptions={
        from:'alandwayne90@gmail.com',
        to:req.body.email,
        subject:'verification',
        text:'Click this link to verify your account\n '+ 'http://localhost:3000/verify/'+user._id
    }
    
    transporter.sendMail(mailOptions,function(err,response){
        if(err){
            console.log(err)
            res.status(400).send('Error in sending email')
        }else{
            console.log('mail sent successfully')
            res.status(200).send({name:user.name,email:user.email})
        }
    })

})

router.get('/verify/:id',async (req,res)=>{
    const id=req.params.id
    const _id=mongoose.Types.ObjectId(id)

    await User.findByIdAndUpdate(_id,{active:true},function(err,response){
        if(err){
            res.status(400).send(err)
        }
        res.status(200).send('<h1> Email verified successfully. Please proceed to login')
    })
})

router.post('/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        if(user.active==false){
            return res.status(401).send('Email verification pending.')
        }
        var data={loggedin:true,
            token:token,
            email:user.email,
            design:user.design.attempted,
            technical:user.design.attempted,
            management:user.design.attempted
        }
        res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }


})

router.post('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send('Logged out successfully')
    }catch(e){
        res.status(500).send('Logout Error!')
    }
})

router.post('/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send('Logged Out of All sessions')
    }catch(e){
        res.status(400).send('Could not Loggout of all Devices')
    }
})

router.post('/technical',(req,res)=>{

})

router.post('/technical/finish',(req,res)=>{

})

router.post('/management',auth,(req,res)=>{
    var questions={
        "question1":"How Loren ipsum",
        "question2":"How lorem ipsum",
        "quetsion3":"how lorem ipsum"
    }
    res.status(200).send(questions)

})

router.post('/design',auth,(req,res)=>{
    var questions={
        "question1":"How Loren ipsum",
        "question2":"How lorem ipsum",
        "quetsion3":"how lorem ipsum"
    }
    res.status(200).send(questions)

})

module.exports=router