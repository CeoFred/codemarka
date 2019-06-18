const {Schema,model} = require('mongoose');


const conversationSchema = Schema({
    _id: Schema.Types.ObjectId,
    classroom_id: {
        type: Schema.Types.ObjectId
    },
    username:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

let Conversation = model('Conversation', conversationSchema);
module.exports = Conversation;