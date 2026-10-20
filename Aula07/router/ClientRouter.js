const express = require('express');
const router = express.Router();
const clientController = require("../controller/ClienteController.js")

router.get("/clientes",  (req,res)=>{
  return clientController.findAll(req,res)
})

module.exports = router;