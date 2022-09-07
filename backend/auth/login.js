const router = require("express").Router();
const { CheckEmail } = require("../db/MongClient");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const result = await CheckEmail(email, { sign_in: true }, password);

  if (typeof result === "string") {
    res.status(400).send(result);
  } else {
    delete result.password;
    res.status(200).send(result);
  }
});

module.exports = router;
