const express = require("express");
const {
  signup,
  login,
  listProperties,
  filterProperties,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/list-properties", listProperties);

router.get("/filter-properties", filterProperties);

module.exports = router;
