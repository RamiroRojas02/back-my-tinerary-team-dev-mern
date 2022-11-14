const hotel = require('../models/Hotel')


const controller = {
    create:async(req, res)=>{
        console.log(req)
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


}

module.exports = controller