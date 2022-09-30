const router = require("express").Router();
const { addCategory, addSubCategory, getSubCategory } = require("../controllers/Categories");

const { verifyToken } = require("../middleware/verifyToken");

router.post("/addcategory", verifyToken, addCategory);
router.post("/addsubcategory", verifyToken, addSubCategory);
router.post("/getsubcategory", verifyToken, getSubCategory);

module.exports = router;
