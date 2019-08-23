// import express from "express";
// import classroomController from "../controllers/classroom";
// import {check} from "../middleware/check_Auth";

// const router = express.Router();

// // return all active classrooms in particular location
// router.get("/l/:location", classroomController.getClassroomFromLocation);

// //  create a new classroom
// router.post("/create", check, classroomController.createClassRoom);

// // get details about a particular class
// router.get("/view/:id", classroomController.getDetails);

// // invite someone via mail to a class
// router.post("/invite/:classroomid", check);

// // here we check if user is eligible to join a classroom
// router.get("/join/:classroomid", check);

// // set permissions
// router.post("/permissions/set/:classroomid", check);

// // ban user from classroom
// router.post("/users/:userid/ban/:classroomid", check);

// // Updadte class information
// router.patch("/update/:classroomID", check, classroomController.updateClassInformation);

// /**
//  * End a class session permanently
//  */
// router.delete("/end/:classroomid", check, classroomController.endClassPermanently);

// export default  router;

// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const multer = require("multer");
// const {check, validationResult, body, sanitizeBody } = require("express-validator");
// const checkAuth = require("../middleware/check_Auth");

// const User = require("../models/users");
// const Classroom = require("../models/classroom");

// // return all active classrooms in particular location
// router.get("/classrooms/all/", (req, res) => {

//     const user = req.decoded.data.userId;

//     // find user
//     User.findById(user).exec().then((user) => {
//         console.log(user);
//     }).catch((err) => {

//         res.status(402).json({ err });
//     });

//     // find classrooms
//     Classroom.find({ created_by: user }).exec()
//         .then((data) => res.json({ data, status: "success" }))
//         .catch((err) => res.status(404).json({ err: "user not found" }));
// });

// //  create a new classroom
// router.post("/create", checkAuth, [
//     // sanitizeBody(['topic', 'visibiliity', 'created_by', 'location', 'description']).trim().toString().escape(),
//     // sanitizeBody(['size']).toInt(),
//     check(["autostart", "name", "size", "topic", "start_time", "start_date", "description", "location", "visibility", "created_by"]).exists()
// ], (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(403).json({ errors: errors.array() });
//     }

//     console.log(req.body);
//     // return
//     const { autostart, name, size, topic, start_time, start_date, description, location, visibility, created_by } = req.body;
//     // status 1 means ceated,but has not started
//     let invitationURL = Math.random() * 23;
//     invitationURL = `http://localhost:3000/classroom/${invitationURL}`;

//     const newclassroom = new Classroom({
//         _id: new mongoose.Types.ObjectId(),
//         name,
//         size,
//         topic,
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

//     newclassroom.save().then((data) => {
//         res.status(201).json({ status: "created", data });
//     }).catch((err) => res.status(501).json({ error: err, type: "mongo" }));

// });

// // view details about a particular class
// router.get("/view/:id", (req, res, next) => {
//     console.log(req.headers);
//     console.log(req.ip);
//     const id = req.params.id;
//     Classroom.findById(id)
//         .exec()
//         .then((data) => {
//             res.status(200).json(data);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });

// });

// router.post("/", checkAuth, upload.single("productImage"), (req, res, next) => {

//     console.log(req.file);
//     const product = new Product({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         price: req.body.price,
//         productImage: req.file.path
//     });
//     console.log(product);
//     product
//         .save()
//         .then((data) => {

//             console.log("Success " + data);
//             res.status(200).json({
//                 message: "created product",
//                 newProduct: {
//                     name: data.name,
//                     price: data.price,
//                     id: data._id,
//                     url: req.originalUrl + "" + data._id
//                 }
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ message: err });

//         });

// });

// router.get("/:productId", (req, res, next) => {

//     const id = req.params.productId;
//     Product.findById(id)
//         .select("name price _id productImage")
//         .exec()
//         .then((doc) => {
//             if (doc) {
//                 res.status(200).json({
//                     product: doc,
//                     request: {
//                         type: "GET"
//                     }
//                 });
//                 console.log("Success " + doc);

//             }
//         })
//         .catch((err) => {
//             console.log("Failed: " + err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

// router.patch("/:productId", checkAuth, (req, res, next) => {

//     const id = req.params.productId;
//     const updateOps = {};
//     console.log(req.body);
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     console.log(updateOps);

//     Product.update({ _id: id }, { $set: updateOps })
//         .exec()
//         .then((data) => {
//             res.status(200).json({
//                 message: "product Upated",
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:3000/products/" + id
//                 }
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//                 message: err
//             });
//         });

// });

// router.delete("/:productId", checkAuth, (req, res, next) => {
//     const id = req.params.productId;
//     Product.deleteOne({ _id: id }).exec()
//         .then((result) => {
//             res.status(200).json({
//                 message: "Product Deleted",
//                 request: {
//                     type: "POST",
//                     url: "http://localhost:3000/product",
//                     body: {
//                         name: String,
//                         price: Number
//                     }
//                 }
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//                 message: err
//             });
//         });
// });
// module.exports = router;
