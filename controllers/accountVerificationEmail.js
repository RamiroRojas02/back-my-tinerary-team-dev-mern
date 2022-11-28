const {createTransport} =require('nodemailer')
const {google} =require('googleapis')
//defino el constructor de propiedades del modulo de googleapis
const OAuth2 = google.auth.OAuth2
//Defino las variables de entorno con los datos de las credenciales de google,
// estas credenciales son del mail que va a manejar el envio de correos de verificacion
const {GOOGLE_ID,GOOGLE_REFRESH,GOOGLE_SECRET,GOOGLE_URL,GOOGLE_USER,BACK_URL} = process.env

//defino una funcion para construir la credencial
function createClient(){
    return new OAuth2(//requiere los datos que alojamos en las variables
        GOOGLE_ID,
        GOOGLE_SECRET,
        GOOGLE_URL
    )
}

//defino el transportador
function getTransport(client){ 
    //la funcion requiere que le pase la credencial(COMPLETA) que retorno en la funcion anterior (la recien creada+refresh token)

    //accesss token tiene vecimiento, por eso necesito utilizar metodos de google para poder "calcular" ese codigo
    const accessToken = client.getAccessToken()
    return createTransport({
        service:'gmail',    //nombre de servicio de mensajeria 
        auth:{              //los datos de las credenciales
            user: GOOGLE_USER,
            type: 'OAuth2',
            clientId:GOOGLE_ID,
            clientSecret:GOOGLE_SECRET,
            refreshToken:GOOGLE_REFRESH,
            accessToken:accessToken
        },
        tls:{rejectUnauthorized:false}
        //prop de seguridad para que el antivirus no rechaze el mail
    })
}

//defino una funcion para definir el cuerpo del mail
//va a ser un template string
//debe tener un link hacia una ruta del controlador de usuario 
//que cambia la propiedad verificado de false a true
function getEmailBody({email,host,code}){
    return `
    <h1>Hola!, ${email}</h1>
    <p>¡Click on<a href="${host}auth/verify/${code}">
        here 
    </a>to verify your account!</p>
    `
}

//defino en la ultima funcion que junta todas las funciones anteriores
//esta funcion es la que vamos a exportar y utilizar en el metodo sign Up para enviar el correo de 
//verificacion
const accountVerificationEmail=async(mailOfTheNewUser,codeCallculedWithCrypto)=>{
    //defino una credencial utilizando la func anterior 
    const client = createClient()
    //set del refresh token en la credencial
    //es necesario setearlo manualmente
    //porque el constructor NO admite la propiedad 
    //REFRESH TOKEN para la creacion de una credencial
    client.setCredentials({refresh_token: process.env.GOOGLE_REFRESH})
    //defino un trasportador utilizando la funcion anterior
    const transport =getTransport(client)
    //defino las opciones del correo
    const mailOptions={
        from:GOOGLE_USER,//desde donde envio el correo
        to:mailOfTheNewUser,//hacia quien 
        subject:'Verify your new account in ',//asunto del mail
        html: getEmailBody({email:mailOfTheNewUser,code:codeCallculedWithCrypto,host:BACK_URL})
    }
    //utilizo el metodo sendMail del transportador para enviar el correo
    //el metodo requiere que le pase las opciones del correo y una funcion callback
    //para manejar el error
    await transport.sendMail(mailOptions,(error,response)=>{
        if(error){
            console.error(error)
            return
        }
        console.log('Email sent!')
    })
}

module.exports = accountVerificationEmail