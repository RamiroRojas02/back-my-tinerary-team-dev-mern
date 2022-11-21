const Itinerary = require ('../models/Itinerary')
const controller = {
    read: async(req,res)=>{
        let {cityId} = req.query
        console.log(cityId);
        try {
            let itineraries = await Itinerary.find({ cityId : cityId}).populate("userId",["name","photo"]).populate("cityId")
            console.log(itineraries)
            if (itineraries) {
                res.status(200).json({
                    response: itineraries,
                    success: true,
                    message: "Itineraries founded"
                })
            }else{
                res.status(404).json({
                    success:false,
                    message: `Itineraries with id : ${cityId}, doesn't exist`
                })  
            }
        } catch (error) {
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    },
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
    },    destroy:async (req,res)=>{
        let {id}=req.params
        try{
            let disappear= await Itinerary.findOneAndDelete({_id:id})
            if(disappear){
                res.status(200).json({
                    id:disappear._id,
                    success:true,
                    message:"The Itinerary was deleted"
                })
            }else{
                res.status(404).json({
                    success:false,
                    message:"Can't found the Itinerary to delete"
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