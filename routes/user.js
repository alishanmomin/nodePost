const router = require("express").Router();
const {
    register,
    login,
    getuser,
    followRequest,
    getUsersFollowers
} = require("../controllers/Controller");
const { verifyToken } = require("../middleware/verifyToken");
const { adminAuthorization } = require("../middleware/adminToken");

router.post("/register", register);
router.post("/login", login);
router.post("/getuser", getuser);
router.post("/getusersfollowers", getUsersFollowers);
router.post("/followrequest", verifyToken, followRequest);

module.exports = router;
