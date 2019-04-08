const mongoose = require('mongoose');


const userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
         required: true,
        unique: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password : {type: String, required: true},
    phonenumber:{
        type: Number,
        required: true,
        unique:true
    },
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required: true
    },
    deviceID:{
        type: mongoose.Schema.Types.ObjectId
    }
});

let User = mongoose.model('user',userSchema);
module.exports = User;