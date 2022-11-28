const User = require ('../models/User')
const bcryptjs = require('bcryptjs')//de esta libreria vamos a utilizar el metodo hashSync para encriptar la contraseña
const crypto = require('crypto')//de este modulo, vamos a requerir el metodo random bytes
const accountVerificationEmail = require('./accountVerificationEmail')
const { userSignedUpResponse,userSignedOutResponse } = require('../config/responses')
const {invalidCredentialsResponse, } = require('../config/responses')
const jwt = require('jsonwebtoken')

const controller = {
    register: async (req,res,next)=>{
        let {name,age,lastName,photo,email,password}=req.body
        let verified=false
        let role = "user"
        let logged=false
        let code= crypto.randomBytes(10).toString('hex')//10 es la longitud del codigo y hex seria el tipo de numeracion (hexagesimal)
        password = bcryptjs.hashSync(password,10)//1er parametro, un string con la contraseña, y el 2do parametro, el tipo de seguridad ,que no tarda tanto en encriptar , es el n'10  
        try{
            await User.create({name,age,lastName,role,photo,email,password,verified,code,logged})
            //envia el mail de verificacion ( con transportador )
            await accountVerificationEmail(email,code)
            return userSignedUpResponse(req,res)
        }catch(error){
            next(error)
        }

    },
    verify: async (req, res, next) => {
        const { code } = req.params //desestructuro
        try {
            let user = await User.findOneAndUpdate( //busco y actualizo
                { code: code }, //parametro de busqueda
                { verified: true }, //parametro a modificar
                { new: true } //especificacion que reemplace el documento de origen
            )
            if (user) {
                //console.log(user)
                return res.redirect('http://localhost:3000/')
                //deberia redigir a una pagina de bienvenida o home
                //puede retornar un json y manejar la redireccion en el front
            }
            return userNotFoundResponse(req, res) //respuesta
        } catch (error) {
            next(error) //respuesta del catch
        }
    },
    signin: async(req,res, next)=>{
        
        
        let {password} = req.body
        let {user} = req

        console.log(user);
        console.log(password);
        
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
    leave: async (req, res, next) => {
        const { email} = req.user;
        
        try {
          let user1 = await User.findOneAndUpdate({email},{ logged: false },{ new: true });
          console.log(user1);
          return userSignedOutResponse(req, res);
        } catch (error) {
          next(error);
        }
      }
    }

module.exports=controller