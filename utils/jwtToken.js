const jwt = require("jsonwebtoken")

exports.getToken =async (req, res) => {
    const adminId = req.admin._id
    const options ={
        id:adminId,
        time:Date.now()
    }

    const cookieParams = { httpOnly: true, sameSite: "none", secure: true };

    const token = await jwt.sign(options, process.env.jwt_secret_key, {expiresIn:'5min'})

    if(!token){
        return res.status(500).json({
            success:false,
            message:"Faild to generate tokrn",
            isAuthentication:false
        })
    }
    console.log(token);

     res.status(200).cookie("Token", token, cookieParams).json({
        success:true,
        message:"Successfully logged in",
        isAuthentication:true,
        admin:req.admin,
        token
    })
}