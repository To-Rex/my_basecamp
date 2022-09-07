const router = require("express").Router();
const { FindUser } = require("../db/MongClient");

router.post("/", async (req, res) => {
  const { id } = req.body;

  const result = await FindUser(id);

  res.send(result);
});

module.exports = router;
