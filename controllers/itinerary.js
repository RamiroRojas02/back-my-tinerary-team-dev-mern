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
    },update: async (req,res)=>{
        let {id}=req.params        
        try{
           let actualizeItinerary= await Itinerary.findOneAndUpdate({_id:id},req.body,{new:true})
           if(actualizeItinerary){
            res.status(200).json({
                    id:actualizeItinerary._id,
                    success:true,
                    message:"Itinerary modified successfully"
                })
           }else{
                res.status(404).json({
                    success:false,
                    message:"The Itinerary that you wants to actualize doesn't exists"
                })
           }
                           
        }catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }
    }
}
module.exports=controller