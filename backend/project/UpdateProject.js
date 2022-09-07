const router = require("express").Router();

router.post("/", async (req, res) => {
  const {
    name,
    description,
    newMember = { role, permissions: { read, write, update, _delete } },
  } = req.body;
    
    
});

module.exports = router;
