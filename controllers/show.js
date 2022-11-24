
const Show= require('../models/Show')


const controller = {
    read: async(req,res)=>{
        
        let query = {}
        if (req.query.hotelId) {
            query = {hotelId: req.query.hotelId}
        }
        if (req.query.userId) {
            query = {
                ...query,
                UserId: req.query.userId}
        }
        try {
            let shows = await Show.find(query).populate("userId",["name","age","photo","lastName"]).populate("hotelId")

            if (shows) {
                res.status(200).json({
                    response: shows,
                    success: true,
                    message: "Shows founded"
                })
            }else{
                res.status(404).json({
                    success:false,
                    message: `Show with id : ${hotelId}, doesn't exist`
                })  
            }
        } catch (error) {
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    },
    create: async(req,res)=>{
        try {
            let newShow = await  Show.create(req.body)
            res.status(200).json({
                id : newShow._id,
                success: true,
                message: "Show created successfully"
            })
        } catch (error) {
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }
    
    ,
    update: async(req,res)=>{
        let {id} = req.params
        try {
            let show = await Show.findOneAndUpdate({_id: id},req.body,{new :true})
            if (show) {
                res.status(200).json({
                    showUpdate: show,
                    id : show._id,
                    success: true,
                    message: "Show modified successfully"
                })
            }else{
                res.status(404).json({
                    success:false,
                    message: `Show with id : ${id}, doesn't exist`
                })
            }
        } catch (error) {
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    },
    destroy: async(req,res)=>{
        let {id}= req.params
        try {
            let show = await Show.findByIdAndDelete({_id: id})
            if (show) {
                res.status(200).json({
                    id : show._id,
                    success: true,
                    message: "Show deleted successfully"
                })
            }else{
                res.status(404).json({
                    success:false,
                    message: `Show with id : ${id}, doesn't exist`
                })
            }
        } catch (error) {
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }
}
module.exports= controller