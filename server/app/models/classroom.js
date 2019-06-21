const mongoose = require('mongoose');


const classroomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topic: { type: String, required: true},
    description: { type: String, required: true},
    visibility : {type:String,default:'public'},
    size: {type:Number,required:true},
    date_created:{type: Date,default:Date.now},
    icon:{type:String,default:'avater'},
    location:{type:String,lowercase:true},
    start_date:{type:Date,default:Date.now,required:true},
    start_time:{type:Date,required:true},
    invitationURL:{type:String},
    total_participants:{type:Number,default:1},
    created_by:{type:mongoose.Types.ObjectId,required:true},
    autostart:{type:Boolean},
    messagesCount:{type:Number,default:0}
});

let Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;