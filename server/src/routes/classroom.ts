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
