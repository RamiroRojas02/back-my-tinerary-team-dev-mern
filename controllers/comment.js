const Comment = require('../models/Comment')


const controller = {
    create: async(req,res)=>{
        try {
            let newComment = Comment.create(req.body)
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
    }
}



module.exports = controller
