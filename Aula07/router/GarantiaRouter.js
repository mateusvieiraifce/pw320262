const express = require('express');
const router = express.Router();
const garantiaController = require("../controller/GarantiaController.js")

router.get("/garantias", (req, res) => {
  return garantiaController.findAll(req, res)
})

router.post("/garantias", (req, res) => {
  return garantiaController.create(req, res)
})

module.exports = router;