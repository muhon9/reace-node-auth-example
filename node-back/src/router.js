const { register, login } = require("./controllers/auth.controller");
const { getUsers } = require("./controllers/user.controller");
const { auth } = require("./middlewares/auth.middlewares");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get ROute");
});

router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", register);
router.get("/users", auth(), getUsers);

module.exports = router;
