const {
  addBookmarked,
  getBookmarked,
} = require("../controller/userController");
const { removeBookmarked } = require("../controller/userController");

const router = require("express").Router();
router.post("/add", addBookmarked);
router.put("/remove", removeBookmarked);
router.get("/getbookmarked/:email", getBookmarked);
module.exports = router;
