const {Schema,model} = require('mongoose');


const messageSchema = Schema({
    _id: Schema.Types.ObjectId,
    classroom_id: {
        type: Schema.Types.ObjectId,
        required:true
    },
    sent_at:{
        type:Date,
        default:Date.now
    },
    user_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    viewd_by:[{
        user_id:{type:Schema.Types.ObjectId}
    }],
    message:{
        type:String,
        required:true
    }
});

let Message = model('Message', messageSchema);
module.exports = Message;