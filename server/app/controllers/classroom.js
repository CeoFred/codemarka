const Classroom = require('../models/classroom');
const Editor = require('../models/editors');

const mongoose = require('mongoose');
const multer = require('multer');
const {validationResult,body} = require('express-validator/check');

var created = 1


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+ file.originalname)
    }
  })

  function fileFilter (req, file, cb) {
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    // To accept the file pass `true`, like so:
 return   cb(null, true);
}
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
    cb(null, false);
    // You can always pass an error if something goes wrong:
      cb(new Error('Image should be of type jpeg or png!'))

  }

const upload = multer({
    fileFilter: fileFilter,
    storage: storage ,limits:{
    fileSize: 1024 * 1024 * 5
}});

exports.createClassRoom =  (req,res,next) => {
    var classroom_id
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        return res.status(403).json({errors:errors.array()})
    }

console.log(req.body)
// return
const  {autostart,name,size,topic,start_time,start_date,description,location,visibility,created_by} =  req.body
// status 1 means ceated,but has not started    
let invitationURL = Math.random() * 23;
   invitationURL =  `http://localhost:3000/classroom/${invitationURL}`


   //get user id and compare with json decoded token sent
let userid  =  req.decoded.data.userId

if(userid !== created_by){
    res.status(403).json({err:'User token sent does not match'})
}

  let newclassroom =   new Classroom({
        _id: new mongoose.Types.ObjectId(),
        name,
        size,
        topic,
        start_time,
        start_date,
        description,
        location,
        visibility,
        created_by,
        status:created,
        autostart,
        invitationURL

    })
    newclassroom.save().then(data => {
        // create editors for class
        


        res.status(201).json({status:'created',data})

        
    new Editor({
        _id:new mongoose.Types.ObjectId(),
        classroom_id:data._id,
        mode:'Javascript'
    }).save().catch(err => res.status(504).json({err,type:'js editor creation failed'}))

    new Editor({
            
        _id:new mongoose.Types.ObjectId(),
        classroom_id:data._id,
        mode:'css'
    }).save().catch(err => res.status(504).json({err,type:'css editor creation failed'}))

    new Editor({
            
        _id:new mongoose.Types.ObjectId(),
        classroom_id:data._id,
        mode:'html'
    }).save().catch(err => res.status(504).json({err,type:'html editor creation failed'}))

    }).catch(err => res.status(501).json({error:err,type:'mongo'}))

}

exports.getDetails = (req,res,next) => {
    console.log(req.headers);
    console.log(req.ip);
   const id = req.params.id
    Classroom.findById(id)
    .exec()
    .then(data => {
       res.status(200).json(data);
   })
   .catch(err => {
console.log(err)
res.status(500).json({
    error: err
})
   });

}


exports.getClassroomFromLocation  = (req,res) => {
    const location = req.params.location
    // res.json({location})
    Classroom.find({'location':location}).exec().then(data=>res.json({data})).catch(err=>res.status(404).json(err))
}

exports.endClassPermanently = (req,res)=>{
    let id = req.params.classroomid
    Classroom.deleteOne({_id:id}).exec()
    .then(result => {
        res.status(200).json({
            message: 'Classroom Ended',
            result
        });   
     })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: err
        })
    })
}

exports.updateClassInformation = (req,res)=>{

    const id = req.params.classroomID;
    const updateOps = {};
    console.log(req.body);
    for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }
    console.log(updateOps);

    Classroom.update({_id : id},{$set:updateOps})
            .exec()
           .then(data => {
    res.status(200).json({
        message: 'Classroom Upated',
        request: {
            type: 'GET',
            url: 'http://localhost:3000/classroom/preview/'+id
        }
    });
    })
        .catch(err => {
    console.log(err)
    res.status(500).json({
        message:err});
    })

}