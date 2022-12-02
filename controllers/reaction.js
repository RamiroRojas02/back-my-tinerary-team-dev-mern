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
        try{
            let queryName = req.query.name
            let query= {}
            if (req.query.itineraryId) {
                query = {
                    itineraryId: req.query.itineraryId,
                };
            }
            if (req.query.showId) {
                query = {
                    showId: req.query.showId,
                };
                console.log(query);
            }
            query= {...query,
                name: { $regex :queryName, $options:'i'}}




            let postReaction = await Reaction.findOne(query)
            if (postReaction) {
                if(postReaction.userId.includes(req.user.id)){


                    const editReaction = await Reaction.findOneAndUpdate(
                        query,{$pull:{userId:req.user.id}},{new:true})
                        res.status(200).json({
                        reaction:editReaction,
                        success: true,
                        message: 'Reaction user id removed'
                })
                }else{
                    const editReaction = await Reaction.findOneAndUpdate(
                         query,{$push:{userId:req.user.id}},{new:true})
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
        if (req.query.showId) {
            query = {
                ...query,
                showId: req.query.showId
             }
        }
        if (req.query.userId) {
            query = {
                ...query,
                userId: req.query.userId
             }   
             console.log(query)
        }
        try{
            let readReactions = await Reaction.find(query)
                 .populate({ path: 'showId', select: 'name lastName photo' })              
                .populate({ path: 'itineraryId', select: 'name photo _id' })
            if (readReactions){
                console.log(readReactions)
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
    },
    destroy: async (req, res) => {
        let { id } = req.params

        try {
            let reaction = await Reaction.findOneAndUpdate({ _id: id }, { $pull: { userId: req.user.id } }, { new: true })
            if (reaction) {
                res.status(200).json({
                    data: reaction,
                    message: "reaction deleted",
                    success: true,
                })
            } else {
                res.status(404).json({
                    message: "reactions not found",
                    success: false,
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
      }
}   
module.exports=controller