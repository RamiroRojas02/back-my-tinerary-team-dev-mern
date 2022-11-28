const User = require ('../models/User')
const bcryptjs = require ('bcryptjs')
const {invalidCredentialsResponse, } = require('../config/responses')
const jwt = require('jsonwebtoken')

const controller = {
    create: async (req,res)=>{
        try{
           let new_user= await User.create(req.body)
                res.status(201).json({
                    userId:new_user._id,
                    success:true,
                    message:"user created successfully"
                })           
        }catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }
    },
    signin: async(req,res, next)=>{
        
        
        let {password} = req.body
        let {user} = req

        
        try {
            const verifyPassword = bcryptjs.compareSync(password, user.password)
            if (verifyPassword) {
                console.log("entro");
                await User.findOneAndUpdate({email: user.email }, { logged: true},{new: true})
                let token = jwt.sign(
                    {id: user._id},
                    process.env.KEY_JWT,
                    {expiresIn : 60*60*24}
                    )
                user = {
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    photo : user.photo,
                    role: user.role
                }
                return res.status(200).json({
                    response:{user,token},
                    success: true,
                    message: `Welcome ${user.name}`
                })
            }else{
                console.log("contraseña mal");
                return invalidCredentialsResponse(req,res)
            }
        } catch (error) {
            next(error)
        }
    },
    signinWithToken: async (req,res,next)=>{
        let { user } = req 
        console.log(user)
        try {
            return res.json({ 
                response: { user },
                success: true,
                message: 'Welcome ' + user.name
            })
        } catch (error) {
            next(error) 
        }
    },
    getMyProfile: async(req,res,next)=>{
        let {id} = req.params
        console.log(id);
        try {
            let user = await User.find({_id:id})

            if (user) {
                res.status(200).json({
                    myUser: user,
                    success:true,

                })
            }else{
                res.status(404).json({
                    success:false,
                    message:`user with id ${id} doesn't exist`
                })
            }
        } catch (error) {
            next(error)
        }
    },
    updateMyProfile: async(req,res,next)=>{
        let {id} = req.params
        try {
            let user = await User.findOneAndUpdate({_id: id},req.body, {new: true})
        if (user) {
            res.status(200).json({
                newUser: user,
                success:true
            })
        }else{
            res.status(404).json({
                success:false,
                message: `user with id ${id} doesn't exist`
            })
        }
        } catch (error) {
            next(error)
        }


    }
}
module.exports=controller