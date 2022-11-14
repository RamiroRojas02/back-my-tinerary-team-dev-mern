const City = require ('../models/City')
const controller = {
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