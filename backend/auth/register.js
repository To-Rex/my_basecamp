const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Register } = require("../db/MongClient");

router.post("/", async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt, (error, hash) => {
      console.log(error);
      console.log(hash);
    });
    const result = await Register({
      name,
      password: hashedPassword,
      email,
      sign_in: true,
    });

    if (typeof result == "string") {
      res.status(409).send(result);
    } else {
      res.status(200).send("success");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
