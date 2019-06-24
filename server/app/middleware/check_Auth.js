const jwt = require('jsonwebtoken');

module.exports = (req,res,next)  =>{
    let token
    if(req.body.token){
     token = req.body.token
    }else if(req.param.token){
        token = res.param.token
    }else if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
    }
    console.log(token)
    
    //check if an authtorization headeer exixsts
try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.usertoken = jwt.decode(token)
    req.decoded = decoded
    }catch(err){
    return res.status(404).json({
        message:"Auth Failed"
    })
}

next();

}