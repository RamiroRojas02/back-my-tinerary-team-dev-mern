const Hotel = require('../models/Hotel')



const controller = {
    read: async(req,res)=>{
        let query = {}
        let order = {}
        // let {id} = req.body.params

        if (req.query.name) {
            query = {name: req.query.name}
            
            
        }
        if (req.query.order) {
            order = {name : req.query.order}
        }
        try {
            console.log(query);

            let hotels = await Hotel.find(query)
            .sort(order)
            
            // hotels = hotels.includes(query.name)
            

            if (hotels) {
                res.status(200).json({
                    response: hotels,
                    success: true,
                    message: 'Hotels found'
                })
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message : "hotels not found"

            })
        }
        
    },
    one: (req,res)=>{
        let {query} = req.query
        console.log(query);

        try {
            let hotel =  Hotel.find(query).populate("userId",["name","photo"])
            if (hotel) {
                res.status(200).json({
                    response: hotel,
                    success: true,
                    message: 'hotel found'
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message : error.message

            })
        }
    } ,
    create:async(req, res)=>{

        try {
            let newHotel = Hotel.create(req.body)
            res.status(200).json({
                id: (await newHotel)._id,
                success: true,
                message : "Hotel create successfully"
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message : error.message

            })
            
        }
    },
    update: async(req,res)=>{
        let { id } = req.params
        try {
            let hotel = await Hotel.findOneAndUpdate({_id: id}, req.body, { new : true})

            if (hotel) {
                res.status(200).json({
                    success: true,
                    message: "Hotel modified successfully"
                })
            }else{
                res.status(404).json({
                    success: false,
                    message: `Hotel with id : ${id}, doesn't exist`
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message : error.message

            })
        }
    },
    destroy: async( req,res)=>{
        let { id } =req.params
        try{
            let deletes= await Hotel.findOneAndDelete({_id:id})
            if(deletes){
                res.status(200).json({
                    id:deletes._id,
                    success:true,
                    message: `The hotel with id: ${id}, was deleted`
                })
            }else{
                res.status(404).json({
                    success:false,
                    message:`Can't found the hotel with id: ${id} `
                })
            }
        } catch(error){
            res.status(400).json({
                success: false,
                message : error.message

            })
        }
    }


}

module.exports = controller