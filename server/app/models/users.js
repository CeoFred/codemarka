const mongoose = require('mongoose');


const userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
         required: true,
        unique: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password : {type: String, required: true},
    firstname:{
        type: String,
        required:false
    },
    lastname:{
        type: String,
        required: false
    },
    accountType:{
        type: Number,
        required:true
    },
    username:{
        required: true,
        type: String
    },
    updated_at: {
        required: false
    }
});

let User = mongoose.model('user',userSchema);
module.exports = User;