const Itinerary = require('../Itinerary')
require("dotenv").config();
require("../../config/database/database");
const Reaction = require('../Reaction')


async function createAllReactions(){
    let itineraries = await Itinerary.find()
    itineraries.forEach((e)=>{
        let reactions = [{
        itineraryId : e._id,
        name : "like",
        icon : "https://img.icons8.com/ios/50/null/thumb-up--v1.png",
        iconBack : "https://img.icons8.com/ios-filled/50/null/thumb-up--v1.png",
        userId: []
    },{
        itineraryId : e._id,
        name : "dislike",
        icon : "https://img.icons8.com/ios/50/null/thumbs-down.png",
        iconBack : "https://img.icons8.com/ios-filled/50/null/thumbs-down.png",
        userId: []
    },{
        itineraryId : e._id,
        name : "love",
        icon : "https://img.icons8.com/ios/50/000000/like--v1.png",
        iconBack : "https://img.icons8.com/ios-filled/50/000000/like--v1.png",
        userId: []
    },{
        itineraryId : e._id,
        name : "surprise",
        icon : "https://img.icons8.com/ios/50/000000/surprised.png",
        iconBack : "https://img.icons8.com/ios-filled/50/000000/surprised.png",
        userId: []
    }]
    reactions.forEach( e =>{
        Reaction.create({
            itineraryId : e.itineraryId,
            name : e.name,
            icon : e.icon,
            iconBack : e.iconBack,
            userId: e.userId
   })
})
})

} 

createAllReactions()

