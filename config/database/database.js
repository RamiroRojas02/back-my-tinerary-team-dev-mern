const mongoose = require('mongoose')

let connection = async() => {
    try {
        //intento conectarme a la base de datos con el método conect de mongoose
        mongoose.connect(
            //link de conexion a base datos
            process.env.DB_LINK,
            //objeto con configuraciones de conexion
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
        console.log('connected to database');
    } catch (error) {
        console.log(error.message)
    }
}

connection()