const router = require("express").Router();
const { DeleteUser } = require("../db/MongClient");

router.post("/", async (req, res) => {
  const { id } = req.body;

  const result = await DeleteUser(id);

  res.send(result);
});
