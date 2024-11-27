const Admin = require("../Models/adminModer")
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/jwtToken");


exports.admin = async(req, res) => {
    
    const {name, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const admin = await Admin.create({
            name,
            email,
            password:hashedPassword
        })
        if (!admin) {
            return res.status(500).json({
                success: false,
                message: "Failed to register the admin",
            });
        }
        res.status(200).json({
            success: true,
            message: "Admin created successfully!",
            admin,
        });
        console.log(admin);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
}



exports.adminLogin =async (req, res)=>{
    const {email, password} = req.body

    try {
        const admin = await Admin.findOne({ email: email })
    if(!admin){
        return res.status(401).json({
            success:false,
            message:"Invalied Credentials"
        })
    }

    const isPassword = await bcrypt.compare(password, admin.password)

    if(!isPassword){
        return res.status(401).json({
            success:false,
            message:"Invalied Credentials"
        })
    }

    req.admin = admin

    getToken(req,res);

    // res.status(200).json({
    //     success:true,
    //     message:"Successfully logged in",
    //     isAuthentication:true
    // })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllAdmin = async(req, res) => {
        console.log(req.cookies);
        
    try {
        const admins = await Admin.find()
        if (!admins) {
            return res.status(500).json({
                success: false,
                message: "Admins not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Admin fatched successfully",
            admins
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}