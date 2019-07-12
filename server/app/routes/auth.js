const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    check,
    validationResult,body
} = require('express-validator/check');

const {
    sanitizeBody
} = require('express-validator/filter');
const User = require('../models/users');

const {empty,success,exists,failed,created,invalid} = require('../response');


router.get('/jwt',(req,res,next) => {

            //check if an authtorization headeer exixsts
            const token = req.query.token;

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY,{complete:true});
                if(decoded){
                    var d = jwt.decode(token,{complete:true})
              return success(res, d.payload);

                }
            } catch (err) {
                return res.status(404).json({
                    message: "Auth Failed"
                })
            }

})

router.post('/user/login',
    check('email').isEmail().withMessage('A valid email is required to signin')
,(req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return invalid(res,errors)
        }
console.log(req.body)
User.find({ email: req.body.email })
    .exec()
    .then(user => {
    if(user.length < 1){
         failed(res,{
            message:"Invalid email, try signing up",
            "status":"failed"
        });
    }else{
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            if(err){
                return res.status(401).json({
                    message:"Failed with code x(2e2x)"
                });
            }
            if(result){

                const token = jwt.sign({
                            data:{
                            email: user[0].email,
                            userId: user[0]._id,
                            username:user[0].username
                            }
                    },
                     process.env.JWT_SECRET_KEY,
                     {
                         expiresIn:"7d",
                         mutatePayload:true
                     });
                 req.headers.authorization = 'Bearer '+ token;
              return  success(res,{
                    message:"Success",
                    token: token,
                    userId:user[0]._id,
                    expires:7*(24*60*60*60),
                    username:user[0].username
                })
            }else{
                return res.status(401).json({
                    message: "Failed"
                });
            }

        });
    }
})
.catch(err => {
    return res.status(401).json({
        message:err,
        "status":"failed",
        "code":"22"
    });
})
});

router.post('/user/signup',
 [check('email').exists().withMessage('Email is required'),
 check('password').exists().withMessage('Password is required')],
   (req, res, next) => {

    const {
        email,
        password,
        username,
        accountType
    } = req.body;
    
    User.find({email:req.body.email}).exec()
    .then(user => {
        if(user.length >= 1){
            exists(res,'Email already exist')
        }else{
    bcrypt.hash(password,10,(err,hash) => {
        if(err){
            res.status(500).json({
                error: err
                    });
                }else{

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email:email,
        password: hash,
        accountType:accountType,
        username:username
                });

         user.save()
        .then(user => {



            const token = jwt.sign({
                data:{
                email: user.email,
                userId: user._id,
                username:user.username
                }
        },
         process.env.JWT_SECRET_KEY,
         {
             expiresIn:"7d",
             mutatePayload:true
         });
     req.headers.authorization = 'Bearer '+ token;
  return  created(res,{
        message:"User successfully SignedUp",
        token: token,
        userId:user._id,
        expires:7*(24*60*60*60),
        username:user.username
    })



                })
                .catch(err => {
                    res.status(500).header('Error:True').json({
                        messageMongo:err
                    });
                })
            }
        });

        }
    })
    .catch(err => {
        res.status(500).json({
            message:err
        })
    });

});

router.delete('/:userId',(req,res,next) =>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(201).header('Validated:True').json({
            message:"User deleted",
            data: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message:err
        });
    });
})

module.exports = router;