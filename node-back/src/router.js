const authController = require("./controllers/auth.controller");
const { getUsers } = require("./controllers/user.controller");
const { auth } = require("./middlewares/auth.middlewares");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get ROute");
});

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshTokens);
router.get("/users", auth(), getUsers);

module.exports = router;
