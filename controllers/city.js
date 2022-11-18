const City = require ('../models/City')
const controller = {
    read: async(req,res)=>{
        let query = {}
        if (req.query.continent) {
            query = {continent : req.query.continent}
        }
        if (req.query.name) {
            query = {
                ...query,
                name: { $regex :req.query.name, $options:'i'} }   
        }

        try {
            console.log(query);

            let cities = await City.find(query)
            if (cities) {
                res.status(200).json({
                    response: cities,
                    success: true,
                    message: 'Cities found'
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:"Cities not found"
                })
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message :error.message

            })
        }
        
    },
    create: async (req,res)=>{
               try{
               let new_city= await City.create(req.body)
                    res.status(201).json({
                        id:new_city._id,
                        success:true,
                        message:"city created successfully"
                    })           
            }catch(err){
                res.status(400).json({
                    success:false,
                    message:err.message
                })
            }
    },
    update: async (req,res)=>{
        let {id}=req.params
        console.log(id)
        
        try{
           let actualize= await City.findOneAndUpdate({_id:id},req.body,{new:true})
           if(actualize){
            res.status(200).json({
                    id:actualize._id,
                    success:true,
                    message:"City modified successfully"
                })
           }else{
                res.status(404).json({
                    success:false,
                    message:"The City doesn't exists"
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
            let deletes= await City.findOneAndDelete({_id:id})
            if(deletes){
                res.status(200).json({
                    id:deletes._id,
                    success:true,
                    message:"The city was deleted"
                })
            }else{
                res.status(404).json({
                    success:false,
                    message:"Can't found the city"
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