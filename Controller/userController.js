const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const { getToken } = require("../utils/jwtToken")


exports.newUser = async(req, res) => {
    const {fullName, email, password} = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    try {
        const user =await User.create({
            fullName,
            email,
            password:hashPassword
        })
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Registration faild"
            })
        }
        res.status(200).json({
            success: true,
            message: "Registration completed successfully!",
            isAuthentication: true,
            user
        })
        console.log(user);
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllUsers = async(req, res) => {
    console.log(req.cookies);
    
    try {
        const users = await User.find()
        if (!users) {
            return res.status(500).json({
                success: false,
                message: "user not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "User fatched successfully",
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.getUser = async(req, res) => {
    const {id} =req.params
    try {
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"User fateched successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.editUser = async(req, res) => {
    const {id} = req.params

    const {fullName, email} = req.body
    try {
        const user =await User.findById(id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        user.fullName = fullName
        user.email = email
        user.save()

        res.status(200).json({
            success:true,
            user,
            message:"User updated successfully!"
        })
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       })
    }
}

exports.deleteUser = async(req,res) => {
    const {id} = req.params
    try {
       const user = await User.findByIdAndDelete(id)
       if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(201).json({
        success:true,
        message:"User Deleted succesfully!"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.addUserRole = async(req, res) =>{
    const { id } = req.params 
    const { role } = req.body

    try {
        
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        if (!['Admin', 'Client', 'Viewer','Super admin',].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }
        user.role = role;
        user.save();

        
        res.status(200).json({
            success:true,
            user,
            message:"user role updated successfully",
        });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



