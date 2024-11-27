const express = require("express")

const router = express.Router()
const { admin, adminLogin, getAllAdmin } = require("../Controller/adminController")
const { authToken } = require("../middleware/auth")


router.route("/admincreate").post(admin)
router.route("/adminlogin").post(adminLogin)
router.route("/admins").get(authToken, getAllAdmin)


module.exports = router