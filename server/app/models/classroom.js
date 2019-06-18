const mongoose = require('mongoose');


const classroomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true},
    description: { type: Number, required: true},
    class_type : {type:String,default:'public'},
    max_number: {type:Number},
    date_created:{type: Date},
    icon:{type:String},
    editor_url:{type:String,required:true},
    location:{type:String},
    start:{type:Date,default:Date.now},
    end:{type:Date},
    invitation_url:{type:URL},
    total_participants:{type:Number,default:1}
});

let Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;