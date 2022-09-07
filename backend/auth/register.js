const router = require("express").Router();
const bcrypt = require("bcrypt");
const e = require("express");
const { Register } = require("../db/MongClient");

router.post("/", async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    let hashed;
    let hashedPassword = await bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        throw error;
      } else {
        console.log("hashed password: " + hash);
        hashed = hash;
      }
    });

    const result = await Register({
      name: name,
      password: hashed,
      email: email,
      sign_in: true,
    });
    console.log(result);
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
