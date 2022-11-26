const validator = (schema) => [
    (req,res,next) =>{

        const data = schema.validate(req.body, {abortEarly : false})//abortEarly en false valida todos los campos juntos y me devuelve un array con todos los errores de validacion, si fuera en true , valida individualmente(significa que salta la alerta uno en uno , pero es peor experiencia para el usuario)
        if (data.error) {
            return res.status(200).json({
                success: false,
                messagge : data.error.details//.map(e => e.message)
            })
        }
        next()
    }
]

module.exports = validator
//el metodo validate , devuelve un objeto con propiedades, en el cual una de ellas tiene un array con todos los errores el objeto se llama data, y todos los errores estan en data.error.details
//un validator es un middleware creado para poder ingresar entre medio de la carga de los datos y asi poder alertar si es que alguna validacion es erronea , para que no permita pasar al metodo de la "creacion"