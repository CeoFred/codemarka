//schema for creating and updating an editor
const {Schema,model} = require('mongoose');


const editorSchema = Schema({
    _id: Schema.Types.ObjectId,
    classroom_id: {
        type: Schema.Types.ObjectId,
        required:true
    },
    last_changed_by:{
        type:Schema.Types.ObjectId,
        default:null
    },
    content:{
        type:String,
    },
    mode:{
        type: String,
        required:true,
        default:'html'
    }
});

let Editor = model('Editor', editorSchema);
module.exports = Editor;