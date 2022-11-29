const Hotel = require('../models/Hotel')



const controller = {
    read: async(req,res)=>{
        let query = {}
        let order = {}
        // let {id} = req.body.params

        if (req.query.name) {
            query = {name: { $regex :req.query.name, $options:'i'} }
            
            
        }
        if (req.query.userId) {
            query = {...query,
            userId: req.query.userId    }
        }
        if (req.query.order) {
            order = {name : req.query.order}
        }
        try {
            console.log(query);

            let hotels = await Hotel.find(query)
            .sort(order).populate("cityId").populate("userId")
            
            // hotels = hotels.includes(query.name)
            

            if (hotels) {
                res.status(200).json({
                    response: hotels,
                    success: true,
                    messagge: 'Hotels found'
                })
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                messagge : "hotels not found"

            })
        }
        
    },

    one: async (req,res)=>{
        let {id} = req.params
        console.log(id);

        try {
            let hotel =  await Hotel.findOne({_id: id}).populate("userId",["name","photo"])

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
                messagge : error.message

            })
        }
    } ,
    create:async(req, res)=>{

        try {
            let newHotel = Hotel.create(req.body)
            res.status(200).json({
                id: (await newHotel)._id,
                success: true,
                messagge : "Hotel create successfully"
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                messagge : error.message

            })
            
        }
    },
    update: async(req,res)=>{
        let { id } = req.params
        try {
            let hotel = await Hotel.findOneAndUpdate({_id: id}, req.body, { new : true})

            if (hotel) {
                res.status(200).json({
                    hotelUpdate: hotel,
                    success: true,
                    messagge: "Hotel modified successfully"
                })
            }else{
                res.status(404).json({
                    success: false,
                    messagge: `Hotel with id : ${id}, doesn't exist`
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                messagge : error.message

            })
        }
    },
    destroy: async( req,res)=>{
        console.log(req.params);
        let { id } =req.params
        try{
            let deletes= await Hotel.findOneAndDelete({_id:id})
            if(deletes){
                res.status(200).json({
                    id:deletes._id,
                    success:true,
                    messagge: `The hotel with id: ${id}, was deleted`
                })
            }else{
                res.status(404).json({
                    success:false,
                    messagge:`Can't found the hotel with id: ${id} `
                })
            }
        } catch(error){
            res.status(400).json({
                success: false,
                messagge : error.message

            })
        }
    }


}

module.exports = controller