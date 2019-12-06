const express=require('express')
const router= new express.Router()
const nodemailer=require('nodemailer')
const User=require('../models/user')
const mongoose=require('mongoose')
const auth=require('../middleware/auth')
var quest=require('../data/techquestions')
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
                user:'appledevelopersgroup@gmail.com',
                pass:'Adgvit_2019'
            }
        })

        var mailOptions={
            from:'appledevelopersgroup@gmail.com',
            to:req.body.email,
            subject:'verification',
            text:'Click this link to verify your account\n '+ 'https://adgvit-recruitment-2k19.herokuapp.com/verify/'+user._id
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
            pass:'Adgvit_2019'
        }
    })

    var mailOptions={
        from:process.env.EMAILID,
        to:req.body.email,
        subject:'verification',
        text:'Click this link to verify your account\n '+ 'https://adgvit-recruitment-2k19.herokuapp.com/verify/'+user._id
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

// router.get('/verify/:id',async (req,res)=>{
//     const id=req.params.id
//     const _id=mongoose.Types.ObjectId(id)

//     await User.findByIdAndUpdate(_id,{active:true},function(err,response){
//         if(err){
//             res.status(400).send(err)
//         }
//         res.status(200).send('<h1> Email verified successfully. Please proceed to login')
//     })
// })

//============================Forgot Password=================================================

// router.post('/forgotpassword',async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user=await User.findOne({email})
//         console.log(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
    
// })

router.post('/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        if(user.active==false){
            return res.status(401).send('Email verification pending.')
        }
        var data={
            loggedin:true,
            token:token,
            email:user.email,
            design:user.design.attempted,
            technical:user.design.attempted,
            management:user.design.attempted,
            regno:user.regno,
            name:user.name
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

    if(req.user.technical.attempted==true){
        return res.status(409).send('Section already attempted')
    }

    if(req.body.year==18 && Number(req.user.regno.slice(0,2))==18){
        var questions={
            "question1":"Github Link!!"
        }
        res.status(200).send(questions)

    }else if(req.body.year==19 && Number(req.user.regno.slice(0,2))==19){
        var min = 0
        var max = quest.length-1//replace with questions.length after questions added

        var random=[]
        while(random.length!=10){
            var x=Math.floor(Math.random() * (max - min + 1)) + min;
            if(!random.includes(x)){
                random.push(x)
            }
        }

        var data=[]
        for(var i=0;i<10;i++){
            data.push(quest[random[i]])
        }
        console.log(data)
        res.send(JSON.stringify(data))
            
        }else{
            res.status(401).send('Invalid Year/Access')
        }
    
    
})

//<====================TECHNICAL SUBMIT QUIZ=====================================

router.post('/technical/submit',auth,async(req,res)=>{
    if(req.user.technical.attempted==true){
        return res.status(409).send('Section already attempted')
    }
    if(req.body.year==18){
        try{
            req.user.technical.coding=req.body.link
            await req.user.save()
            return res.status(200).send('Github linked saved successfully')
        }catch(e){
            res.status(409).send(e)
        }
    }
    
    if(req.user.technical.count==10){
        return res.status(409).send('Section already attempted')
    }
    if(req.user.technical.count==9){
        req.user.technical.attempted=true
    }
    
    var option=req.body.answer;
    var id=req.body.id;
    console.log(id)
    req.user.technical.count=req.user.technical.count+1;
    console.log(typeof(option))
        console.log(typeof(ans[id-1].answer))
        console.log(option)
        console.log(ans[id-1].answer)
    if(option==ans[id-1].answer){
        
        req.user.technical.score=req.user.technical.score+1;
    }
    // var count=0
    // var options=req.body.questions.options.split(",")
    // var ids=req.body.questions.ids.split(",")
    // for(var i=0;i<8;i++){
    //     if(options[i]==ans[ids[i]-1].answer){
    //         count++
    //     }
    // }
    // req.user.technical.score=count
    // req.user.technical.attempted=true
    // req.user.technical.coding=req.body.code



    try{
        await req.user.save()
        res.status(200).send('Question saved succesfully')
    }catch(e){
        res.status(400).send(e)
    }
    

})

//=======================MANAGEMENT QUESTIONS ========================================


router.post('/management',auth,(req,res)=>{

    if(req.user.management.attempted==true){
        return res.status(409).send('Section already attempted')
    }
    if(req.body.year==18 && Number(req.user.regno.slice(0,2))==18){
        var questions={
            "question1":"If you have be a colour in the crayon set, which colour would you prefer to be and why?",
            "question2":"On what basis will you pick up a leader when two of them are capable.",
            "quetsion3":"Come up with a marketing strategy that would reach max people and at the same time is very innovative apart from using social media.",
            "question4":" How will you manage the crowd given the venue has people from previous event already?",
            "question5":"What’s the most creative/innovative thing you have done in the past that you are proud of and you feel it can help in chapter’s growth?"
        }
        res.status(200).send(questions)

    }else if(req.body.year==19 && Number(req.user.regno.slice(0,2))==19){
        var questions={
            "question1":"If you have be a colour in the crayon set, which colour would you prefer to be and why?",
            "question2":"On what basis will you pick up a leader when two of them are capable.",
            "quetsion3":"Come up with a marketing strategy that would reach max people and at the same time is very innovative apart from using social media.",
            "question4":"If a board member instructs you to do something, would you do the task blindly?",
            "question5":"Can you suggest an event that will be fun as well as have a technical side to it?"
        }
        res.status(200).send(questions)
    }else{
        res.status(401).send('Invalid Year')
    }
   

})

//============================MANAGEMENT SUBMISSION========================================

router.post('/management/submit',auth,async (req,res)=>{

    if(req.user.management.attempted==true){
        return res.status(409).send('Section already attempted')
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
    if(req.user.design.attempted==true){
        return res.status(409).send('Section already attempted')
    }
    if(req.body.year==18 && Number(req.user.regno.slice(0,2))==18){
        var questions={
            "question1":"Tell us about yourself.",
            "question2":"Where do you go for UX inspiration",
            "quetsion3":"What design softwares do you know about ?",
            "question4":"What is color harmony ?",
            "question5":"What is the difference between UI and UX ?"
        }
        res.status(200).send(questions)

    }else if(req.body.year==19 && Number(req.user.regno.slice(0,2))==19){
        var questions={
            "question1":"What design softwares do you know about ?",
            "question2":"What is color harmony ?",
            "quetsion3":"What is golden ratio ?",
            "question4":"What is typography ?",
            "question5":"What is the difference between UI and UX ?"
        }
        res.status(200).send(questions)
    }else{
        res.status(401).send('Invalid Year')
    }

})

//==================================DESIGN SUBMISSION==========================================

router.post('/design/submit',auth,async(req,res)=>{
    if(req.user.design.attempted==true){
        return res.status(409).send('Section already attempted')
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

router.post('/resetpassword',async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.send('User not found')
    }
    var transporter=nodemailer.createTransport({
        service:'gmail.com',
        auth:{
            user:process.env.EMAILID,
            pass:'Adgvit_2019'
        }
    })



    var mailOptions={
        from:process.env.EMAILID,
        to:req.body.email,
        subject:'Reset password',
        text:'Click this link to change your password\n '+ 'https://adgvit-recruitment-2k19.herokuapp.com/changepassword/'+user._id
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

router.get('/',(req,res)=>{
    res.send('Hello from ADG')
})

module.exports=router