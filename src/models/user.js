const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    active:{
        type:Boolean,
        required:true,
        default:false
    },
    name:{
        type:String,
        required:true,

    },
    regno:{
        required:true,
        type:String,
        trim:true,
        maxlength:9,
        minlength:9,
        unique:true
    },
    email:{
        required:true,
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        maxlength:10,
        minlength:10,
        required:true
    },
    management:{
        attempted:{
            type:Boolean,
            default:false
        },
        others:[{
            question:{
                type:String,
            },
            answer:{
                type:String
            }
        }
    
        ]

    },
    technical:{
        attempted:{
            type:Boolean,
            default:false
        },
        score:{
            type:Number,
        },
        coding:[
            {
                question:{
                    type:String
                },
                answer:{
                    type:String
                }
            }
        ]
    },
    design:{
        attempted:{
            type:Boolean,
            default:false
        },
        workurl:{
            type:String
        },
        other:[
            {
                question:{
                    type:String
                },
                answer:{
                    type:String
                }
            }
        ]

    },
    tokens:[{
        token:{
            type:String
        }
    }
        
    ]


})

userSchema.methods.generateAuthToken=async function(){
    const user=this

    const token=jwt.sign({_id:user._id.toString()},'thethingsyouusedtoownnowtheyownyou')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to Login')
    }
    const isMatch=bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8);
    }

    next()
})

const User=mongoose.model('User',userSchema)
module.exports=User;