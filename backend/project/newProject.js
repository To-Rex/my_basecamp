const router = require("express").Router();
const { CreateProject } = require("../db/MongClient");

router.post("/", async (req, res) => {
  const { name, description, id } = req.body;
  const result = await CreateProject({ name, description, id });

  res.status(200).send(result);
});

module.exports = router;
