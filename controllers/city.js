const City = require ('../models/City')
const controller = {
    readDetails: async(req,res)=>{
        let {id}=req.params
        try {
            let citiesDetails = await City.findOne({_id:id})
            if (citiesDetails) {
                res.status(200).json({
                    response:{
                        name: citiesDetails.name ,
                        photo: citiesDetails.photo,
                        userId: citiesDetails.userId
                    }, 
                    success: true,
                    message: 'City id found'
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:"City id didn't found"
                })
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message :error.message
            })
        }
        
    },
    read: async(req,res)=>{
        let query = {}
        try {
            console.log(query);
             if (req.query.continent) {

            query = {
                /* ...query, */
                continent :  req.query.continent 
            }
            console.log(req.query.continent)
        }
        if (req.query.name) {
            query = {
                ...query,
                name: { $regex :req.query.name, $options:'i'} }   
        }
        if (req.query.userId) {
            query = {
                ...query,
                userId: req.query.userId
             }   
        }

  
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
                        message:"city created successfully",
                        body: new_city
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
                    citySync:actualize,
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