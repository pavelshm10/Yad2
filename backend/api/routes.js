const express = require("express");
const db = require("../db/mysql-init");
const router = express.Router();
router.use(express.json());

//get projects
router.get("/banks", async (req, res) => {
  var sql = "SELECT * FROM banks";
  try {
    const banks = await db(sql);
    return res.send({
      success: true,
      result: {
        banks,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
});

module.exports = router;
