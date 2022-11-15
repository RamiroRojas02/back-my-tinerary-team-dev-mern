let errorHandler ={
    notFound: (req,res,next) =>{
        res.status(404).json({
            messagge: `Path ${req.url} method ${req.method} isn't implemented`
        })
    },
    internalServer:(error, requ,res,next)=>{
        res.status(500).json({
            messagge: `Internal server error, try again`
        })
    }
}

module.exports = errorHandler