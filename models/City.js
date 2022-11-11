const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: {type:String,required:true},
    name: {type:String,required:true},
    continent:{type:String,required: true},
    photo:{type:String,required: true},
    population:{type:Number,required: true},
    userId: {type:String,required: true},
})
const City = mongoose.model('cities',schema)
module.exports= City


/*  {
    id: "Barcelona-1",
    name: "Barcelona",
    continent: "Europe",
    photo:
      "https://www.spanishpropertyinsight.com/wp-content/uploads/2022/04/barcelona-maritim-americas-cup.jpeg",
    population: 1620000,
    userId: "admin2",
  }, */