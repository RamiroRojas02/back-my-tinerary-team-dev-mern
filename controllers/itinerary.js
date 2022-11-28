const Itinerary = require ('../models/Itinerary')
const controller = {
    read: async(req,res)=>{
        let query = {}        
        try {
            if (req.query.cityId) {
                query = {
                    cityId: req.query.cityId
                 }   
            }
            if (req.query.userId) {
                query = {
                    ...query,
                    userId: req.query.userId
                 }   
            }
            let itineraries = await Itinerary.find(query).populate("userId",["name","photo"]).populate("cityId")
            //metodo de mongoose para relacionar entre colecciones  argumento1:nombre de la coleccion y parametro 2 : propiedades que existen en esa coleccion osea , el populate extrae datos de una coleccion distinta 
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
                    message:"itinerary created successfully",
                    body: new_itinerary
                })           
        }catch(err){
            console.log(err.message)
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
                    itinerarySync:actualizeItinerary,
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
    },
        destroy:async (req,res)=>{
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