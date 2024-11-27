const express = require("express")
const router = express.Router()
const { newRole, getAllRolesAndPermission, getRole, deleteRole } = require("../Controller/roleController")

router.route("/addrole").post(newRole)
router.route("/roles").get(getAllRolesAndPermission)
router.route("/role/:id").get(getRole).delete(deleteRole)

module.exports = router