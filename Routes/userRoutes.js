const express = require("express")

const router = express.Router()

const { newUser, getAllUsers, getUser, editUser, deleteUser, addUserRole,  } = require("../Controller/userController")

const { authToken } = require("../middleware/auth")



router.route("/register").post(newUser)
router.route("/users").get( getAllUsers)

router.route("/user/:id").get(getUser).put(editUser).delete( deleteUser)
router.put("/user/:id/role", addUserRole)





module.exports = router
