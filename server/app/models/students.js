const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classroom_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    joined: { type: String, required: true},
    can_edit : {type:Boolean,default:false},
    user_id: {type:mongoose.Schema.Types.ObjectId,required:true},
    ip:{type:String,default:'avater'},
    class_duration_time:{type:String,},
    messages_sent:{type:Number,default:0}
});

let Students = mongoose.model('Classroom', studentSchema);
module.exports = Students;