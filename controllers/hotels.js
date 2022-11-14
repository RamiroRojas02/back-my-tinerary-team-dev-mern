const Hotel = require('../models/Hotel')
const hotel = require('../models/Hotel')


const controller = {
    create:async(req, res)=>{

        try {
            let newHotel = hotel.create(req.body)
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