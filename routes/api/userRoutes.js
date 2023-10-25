const router = require("express").Router();
const {
  getAll,
  getOne,
  deleteUser,
  newUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usercontroller");

router.route("/").get(getAll).post(newUser);

router.route("/:userId").get(getOne).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
