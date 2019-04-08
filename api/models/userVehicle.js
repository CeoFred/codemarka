const mongoose = require('mongoose');


const userVehicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    carType:{type: String,required: true},
    carModel:{type:String,required:true}
});

let userVehicle = mongoose.model('userVehicle', userVehicleSchema);
module.exports = userVehicle;