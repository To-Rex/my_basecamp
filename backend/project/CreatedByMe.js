const express = require("express");
const router = express.Router();
const { CreatedByMe } = require("../db/MongClient");

router.post("/", async (req, res) => {
  const { id } = req.body;

  const result = await CreatedByMe(id);

  res.status.send(result);  
});

module.exports = router;
