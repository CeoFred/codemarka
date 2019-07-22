// import {Classroom} from "../models/classroom";
// import {Editor} from "../models/editors";

// import { NextFunction, Request, Response } from "express";
// import {body, validationResult} from "express-validator";
// import mongoose from "mongoose";

// const created = 1;

// export const createClassRoom =  (req: Request, res: Response) => {

//     const errors =  validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(403).json({errors: errors.array()});
//     }

//     const  {autostart, name, size, topic, start_time, start_date, description, location, visibility, created_by} =  req.body;
// // status 1 means ceated,but has not started
//     const invitationURL: string =  `http://localhost:3000/classroom/`;

//    // get user id and compare with json decoded token sent
//     const userid  =  req.body.data.userId;

//     if (userid !== created_by) {
//     res.status(403).json({err: "User token sent does not match"});
// }

//     const newclassroom =   new Classroom({
//         name,
//         size,
//         topic,
//         // tslint:disable-next-line: object-literal-sort-keys
//         start_time,
//         start_date,
//         description,
//         location,
//         visibility,
//         created_by,
//         status: created,
//         autostart,
//         invitationURL

//     });
//     newclassroom.save().then((data: { _id: any; }) => {
//         // create editors for class

//         res.status(201).json({status: "created", data});

//         new Editor({
//         _id: new mongoose.Types.ObjectId(),
//         classroom_id: data._id,
//         mode: "Javascript"
//     }).save().catch((err: any) => res.status(504).json({err, type: "js editor creation failed"}));

//         new Editor({

//         _id: new mongoose.Types.ObjectId(),
//         classroom_id: data._id,
//         mode: "css"
//     }).save().catch((err: any) => res.status(504).json({err, type: "css editor creation failed"}));

//         new Editor({

//         _id: new mongoose.Types.ObjectId(),
//         classroom_id: data._id,
//         mode: "html"
//     }).save().catch((err: any) => res.status(504).json({err, type: "html editor creation failed"}));

//     }).catch((err: any) => res.status(501).json({error: err, type: "mongo"}));

// };

// export const getDetails = (req: Request, res: Response, next: NextFunction) => {
//     const id = req.params.id;
//     Classroom.findById(id)
//     .exec()
//     .then((data: any) => {
//        res.status(200).json(data);
//    })
//    .catch((err: any) => {
// res.status(500).json({
//     error: err
// });
//    });

// };

// export const getClassroomFromLocation  = (req: Request, res: Response) => {
//     const location = req.params.location;
//     // res.json({location})
//     Classroom.find({location}).exec().then((data: object) => res.json({data})).catch((err: any) => res.status(404).json(err));
// };

// exports.endClassPermanently = (req: Request, res: Response) => {
//     const id = req.params.classroomid;
//     Classroom.deleteOne({_id: id}).exec()
//     .then((result: object) => {
//         res.status(200).json({
//             message: "Classroom Ended",
//             result
//         });
//      })
//     .catch((err: any) => {
//         res.status(500).json({
//             message: err
//         });
//     });
// };

// exports.updateClassInformation = (req: Request, res: Response) => {

//     const id = req.params.classroomID;
//     const updateOps: any = {};
//     for (const ops of req.body) {
//             updateOps[ops.propName] = ops.value;
//         }

//     Classroom.update({_id : id}, {$set: updateOps})
//             .exec()
//            .then((data: object) => {
//     res.status(200).json({
//         message: "Classroom Upated",
//         request: {
//             type: "GET",
//             url: "http://localhost:3000/classroom/preview/" + id
//         }
//     });
//     })
//         .catch((err: any) => {
//     res.status(500).json({
//         message: err});
//     });

// };
