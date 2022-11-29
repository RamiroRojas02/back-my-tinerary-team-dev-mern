const passport = require('passport')
const passportJwt = require('passport-jwt')


const {KEY_JWT} = process.env
const User = require('../models/User')


passport.use(
    new passportJwt.Strategy(
        {
            jwtFromRequest : passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: KEY_JWT
        },
        async (jwt_payload,done) =>{
            console.log("hola");
            try {
                let user = await User.findOne({_id: jwt_payload.id})
                if (user) {
                    user={
                        name: user.name,
                        lastName: user.lastName,
                        photo: user.photo,
                        email : user.email,
                        role: user.role,
                        id: user._id,
                        logged: user.logged
                    }
                    return done(null, user)
                }else{
                    return done(null,false)
                }
            } catch (error) {
                
                return done(error, false)
            }
        }
    )
)

module.exports = passport