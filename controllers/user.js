const User = require ('../models/User')
const bcryptjs = require('bcryptjs')//de esta libreria vamos a utilizar el metodo hashSync para encriptar la contraseña
const crypto = require('crypto')//de este modulo, vamos a requerir el metodo random bytes
const accountVerificationEmail = require('./accountVerificationEmail')
const { userSignedUpResponse } = require('../config/responses')
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
                return res.redirect('http://localhost:8000')
                //deberia redigir a una pagina de bienvenida o home
                //puede retornar un json y manejar la redireccion en el front
            }
            return userNotFoundResponse(req, res) //respuesta
        } catch (error) {
            next(error) //respuesta del catch
        }
    },
}
module.exports=controller