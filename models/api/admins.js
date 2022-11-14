let users=[
    {
        name:"Eric",
        lastName:"Rodriguez",
        role:"admin",
        photo:"Eric_photo",
        age:23,
        email: "feric.rodriguez@gmail.com",
        password: "Chau6789",
        code: "SiempreViva1234",
        verified:true,
        logged:true

    }  ,  {
        name:"Nicolas",
        lastName:"Lopez",
        role:"admin",
        photo:"Nicolas_photo",
        age:22,
        email: "nicolasgonzalolopez@hotmail.com",
        password: "Hola123",
        code: "SiempreViva1224",
        verified:true,
        logged:true

    }   , {
        name:"Ramiro",
        lastName:"Rojas",
        role:"admin",
        photo:"Ramiro_photo",
        age:21,
        email: "ramirorojas@gmail.com",
        password: "Chau321",
        code: "SiempreViva4321",
        verified:true,
        logged:true

    }   , {
        name:"Ignacio",
        lastName:"Borraz",
        role:"admin",
        photo:"Ignacio_photo",
        age:30,
        email: "ignaborra@gmail.com",
        password: "Chau666",
        code: "SiempreViva666",
        verified:true,
        logged:true

    }
]
require("dotenv").config();
require("../../config/database/database");
const User = require("../User");


users.forEach(elemento=> {
    User.create({
        name: elemento.name,
        lastName: elemento.lastName,
        role:elemento.role,
        photo: elemento.photo,
        age: elemento.age,
        nacimiento: elemento.nacimiento,
        email: elemento.email,
        password: elemento.password,
        code: elemento.code,
        verified: elemento.verified,
        logged: elemento.logged,
    })
})