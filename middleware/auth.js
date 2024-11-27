const jwt = require("jsonwebtoken")

exports.authToken = (req, res, next) => {

    const token = req.cookies

    jwt.verify(token, process.env.jwt_secret_key, (err, decode)=>{
        if(err){
            return res.status(401).json({
                success:false,
                message:"Invalied token",
                isAuthenticationl:false
            })
        }
        console.log(decode);

        next()
        
    })
    
    
}