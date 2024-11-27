const roleModel = require("../Models/roleModel");
const Role = require("../Models/roleModel")

exports.newRole = async (req, res) => {

    const { roleName, permission } = req.body

    try {
        const role = await Role.create({
            roleName,
            permission
        })
        if (!role) {
            return res.status(500).json({
                success: false,
                message: "Failed to create the role",
            });
        }
        res.status(200).json({
            success: true,
            message: "Role created successfully!",
            role,
        });
        console.log(role);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllRolesAndPermission = async(req, res) => {
    try {
        const role = await Role.find()
        if (!role) {
            return res.status(500).json({
                success: false,
                message: "Role not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Role fatched successfully",
            role
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getRole = async(req, res) => {
    const {id} =req.params

    try {
        const role = await Role.findById(id)
        if(!roleModel){
            return res.status(404).json({
                success:false,
                message:"Role not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Role fateched successfully",
            role
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteRole = async(req, res) => {
    const {id} =req.params

    try {
        const role = await Role.findByIdAndDelete(id)
        if(!role){
         return res.status(404).json({
             success:false,
             message:"Role not found"
         })
     }
     res.status(201).json({
         success:true,
         message:"Role Deleted succesfully!"
     })
     } catch (error) {
         return res.status(500).json({
             success:false,
             message:error.message
         })
     }
}