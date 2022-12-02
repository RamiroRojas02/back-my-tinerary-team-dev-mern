const Reaction = require ('../models/Reaction')
const controller = {
    create: async (req,res)=>{
     try{
        let new_reaction= await Reaction.create(req.body)
                res.status(201).json({
                    id:new_reaction._id,
                    success:true,
                    message:"Reaction created successfully",
                    body: new_reaction
                })           
        }catch(err){
            console.log(err.message)
            res.status(400).json({
                success:false,
                message:err.message
            })
        }
    },
    edit: async(req,res)=>{
        let query = {}
       
        if (req.query.name) {
            query = {
                ...query,
                name: { $regex :req.query.name, $options:'i'} 
            }   
        }
        if (req.query.itineraryId) {
            query = {
                ...query,
                itineraryId: req.query.itineraryId
             }   
        }
        try{
            let postReaction = await Reaction.findOne(query)
            if (postReaction) {
                if(postReaction.userId.includes(req.user.id)){
                    const editReaction = await Reaction.findOneAndUpdate({_id: postReaction._id},{$pull:{userId:req.user.id}},{new:true})
                    res.status(200).json({
                        reaction:editReaction,
                        success: true,
                        message: 'Reaction user id removed'
                })
                }else{
                    const editReaction = await Reaction.findOneAndUpdate({_id: postReaction._id},{$push:{userId:req.user.id}},{new:true})
                    res.status(200).json({
                        reaction:editReaction,
                        success: true,
                        message: 'Reaction user id added'
                })
                }
            }else{

                res.status(404).json({
                    success:false,
                    message:"Reaction not found"
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message :error.message

            })
        }
    },readReactions: async(req,res)=>{
        let query = {}
        if (req.query.itineraryId) {
            query = {
                ...query,
                itineraryId: req.query.itineraryId
             }   
        }
        try{
            let readReactions = await Reaction.find(query)
            if (readReactions){
            res.status(200).json({
                reaction:readReactions,
                success: true,
                message: 'Reactions with that id'
                })
            }else{
                res.status(404).json({
                    success: false,
                    message: "Reactions with that id didn't match"
                    })
            }
        }catch(err){
            console.log(err.message)
        }
    }
}   
module.exports=controller