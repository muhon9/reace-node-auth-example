const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get ROute");
});

router.post("/", (req, res) => {
  res.send("POST route");
});

module.exports = router;
