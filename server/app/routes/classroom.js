const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroom.js')
const {check} = require('express-validator');
const checkAuth = require('../middleware/check_Auth');
const {sanitizeBody} = require('express-validator');



//return all active classrooms in particular location
router.get('/l/:location',classroomController.getClassroomFromLocation)

//  create a new classroom
router.post('/create',checkAuth
    // sanitizeBody(['topic','visibiliity','created_by','location','description']).trim().toString().escape(),
    // sanitizeBody(['size']).toInt(),
    // check(['autostart','name','size','topic','start_time','start_date','description','location','visibility','created_by']).exists()
,classroomController.createClassRoom);

// get details about a particular class
router.get('/view/:id', classroomController.getDetails);

//invite someone via mail to a class
router.post('/invite/:classroomid',checkAuth)

//here we check if user is eligible to join a classroom
router.get('/join/:classroomid',checkAuth)

//set permissions
router.post('/permissions/set/:classroomid',checkAuth)

//ban user from classroom
router.post('/users/:userid/ban/:classroomid',checkAuth)


/**Updadte class information */
router.patch('/update/:classroomID',checkAuth,classroomController.updateClassInformation);

/**
 * End a class session permanently
 */
router.delete('/end/:classroomid',checkAuth,classroomController.endClassPermanently);

module.exports = router;