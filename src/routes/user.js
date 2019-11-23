const express=require('express')
const router= new express.Router()
const nodemailer=require('nodemailer')
const User=require('../models/user')
const mongoose=require('mongoose')
const auth=require('../middleware/auth')
var questions=require('../data/techquestions')
var ans=require('../data/answers')


//<=============SIGNUP==============================>
//Name,VIT email,phone no,Reg no ,password is taken and saved to Database
//a verification email is sent to emailID
//If not verified the user won't be able to login
//All API documented using POSTMAN,check the docs at https://documenter.getpostman.com/view/5235222/SW7c17Cp?version=latest#3ca20c26-6db1-4658-a652-cd14d6e55fc6

router.post('/signup',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        
       
        var transporter=nodemailer.createTransport({
            service:'gmail.com',
            auth:{
                user:process.env.EMAILID,
                pass:process.env.PASSWORD
            }
        })

        var mailOptions={
            from:'appledevelopersgroup@gmail.com',
            to:req.body.email,
            subject:'verification',
            text:'Click this link to verify your account\n '+ 'https://adg-backend-rec-2019.herokuapp.com/verify'+user._id
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
//<============RESEND email verification===================>
//takes only the registered email

router.post('/resend',async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.send('User not found')
    }
    var transporter=nodemailer.createTransport({
        service:'gmail.com',
        auth:{
            user:process.env.EMAILID,
            pass:process.env.PASSWORD
        }
    })

    var mailOptions={
        from:process.env.EMAILID,
        to:req.body.email,
        subject:'verification',
        text:'Click this link to verify your account\n '+ 'https://adg-backend-rec-2019.herokuapp.com/verify'+user._id
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

//<===============================EMAIL VERIFICATION=======================

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

//<===============LOGOUT -basically deletes the token from the array ==========================

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

//<=================TECHNICAL - token to be passed as header(Authorization) and the user is identified and Questions are sent back

router.post('/technical',auth,(req,res)=>{
    
    var min = 0
    var max = questions.length//replace with questions.length after questions added

    var random=[]
    while(random.length!=8){
        var x=Math.floor(Math.random() * (max - min + 1)) + min;
        if(!random.includes(x)){
            random.push(x)
        }
    }

    var data=[]
    for(var i=0;i<8;i++){
        data.push(questions[random[i]])
    }
    console.log(data)
    res.send(JSON.stringify(data))
})

//<====================TECHNICAL SUBMIT QUIZ=====================================

router.post('/technical/submit',auth,async(req,res)=>{
    if(req.user.technical.attempted==true){
        return res.send('Section already attempted')
    }
    var count=0
    var options=req.body.questions.options.split(",")
    var ids=req.body.questions.ids.split(",")
    for(var i=0;i<8;i++){
        if(options[i]==ans[ids[i]-1].answer){
            count++
        }
    }
    req.user.technical.score=count
    req.user.technical.attempted=true
    req.user.technical.coding=req.body.code

    try{
        await req.user.save()
        res.status(200).send('Techincal section saved succesfully')
    }catch(e){
        res.status(400).send(e)
    }
    

})

//=======================MANAGEMENT QUESTIONS ========================================


router.post('/management',auth,(req,res)=>{
    var questions={
        "question1":"How Loren ipsum",
        "question2":"How lorem ipsum",
        "quetsion3":"how lorem ipsum"
    }
    res.status(200).send(questions)

})

//============================MANAGEMENT SUBMISSION========================================

router.post('/management/submit',auth,async (req,res)=>{

    if(req.user.management.attempted==true){
        return res.send('Section already attempted')
    }
    req.user.management.others=req.data
    req.user.management.attempted=true

    try{
        await req.user.save()
        res.status(200).send('Management section saved successfully')
    }catch(e){
        res.status(400).send(e)
    }
    
})

//===================================DESIGN QUESTIONS======================================

router.post('/design',auth,(req,res)=>{
    var questions={
        "question1":"How Loren ipsum",
        "question2":"How lorem ipsum",
        "quetsion3":"how lorem ipsum"
    }
    res.status(200).send(questions)

})

//==================================DESIGN SUBMISSION==========================================

router.post('/design/submit',auth,async(req,res)=>{
    if(req.user.design.attempted==true){
        return res.send('Section already attempted')
    }
    req.user.design.attempted=true
    req.user.design.others=req.data
    try{
        await req.user.save()
        res.status(200).send('Design section saved successfully')
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/',(req,res)=>{
    res.send('Hello from ADG')
})

module.exports=router