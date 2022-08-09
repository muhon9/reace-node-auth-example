const { register, login } = require("./controllers/auth.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get ROute");
});

router.post("/login", login);
router.post("/register", register);

module.exports = router;
