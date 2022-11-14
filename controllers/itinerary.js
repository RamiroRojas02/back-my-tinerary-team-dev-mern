const Itinerary = require ('../models/Itinerary')
const controller = {
    create: async (req,res)=>{
        try{
           let new_itinerary= await Itinerary.create(req.body)
                res.status(201).json({
                    userId:new_itinerary._id,
                    success:true,
                    message:"itinerary created successfully"
                })           
        }catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }
    }
}
module.exports=controller