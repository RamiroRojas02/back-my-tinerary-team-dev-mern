const Comment = require('../models/Comment')


const controller = {
    create: async(req,res)=>{
        try {
            let newComment = (await Comment.create(req.body)).populate('userId',['name','photo'])
            res.status(200).json({
                id: (await newComment),
                success: true,
                messagge : "Comment create successfully"
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                messagge : error.message

            })
            
        }
    },
    read: async(req,res)=>{
        let query = {}
        if (req.query.showId) {
            query = {...query,
                showId: req.query.showId    }
        }
        try {
            let comments = await Comment.find(query).sort({date:'desc'}).populate('userId',["photo","name"])
            res.status(200).json({
                comments,
                success:true,
                messagge: 'comments finded'
            })
        } catch (error) {
            res.status(404).json({
                success:false,
                messagge: error.message
            })
        }
    },
    edit: async(req,res)=>{
        let {id}= req.params
        
        try {
            let newComment = await Comment.findOneAndUpdate({_id:id},req.body,{new:true})
            console.log(newComment);
            res.status(200).json({
                newComment,
                success:true,
                messagge: 'comment edited'
            })
        } catch (error) {
            res.status(404).json({
                success:false,
                messagge: error.message
            })
        }
    },
    destroy:async(req,res)=>{
        let {id} = req.params
        try {
            let destroyComment = await Comment.findOneAndRemove({_id:id})
            res.status(200).json({
                destroyComment,
                success:true,
                messagge: 'comment destroyed'
            })
        } catch (error) {
            res.status(404).json({
                success:false,
                messagge: error.message
            })
        }
    }
}



module.exports = controller
