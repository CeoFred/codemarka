const mongoose = require('mongoose');


const carApiSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: Number, required: true},
    model : {type:String},
    modelYear: {type:Number},
    images:[],
    manufacturers:{type:String,required:true},
    colors:[],
    wheelPosition:[]
});

let Car = mongoose.model('Car', carApiSchema);
module.exports = Car;