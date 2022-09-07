const router = require("express").Router();
const { Register } = require("../db/MongClient");

router.post("/", async (req, res) => {
  const { name, password, email } = req.body;

  try {
  

    const result = await Register({
      name: name,
      email: email,
      password,
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
