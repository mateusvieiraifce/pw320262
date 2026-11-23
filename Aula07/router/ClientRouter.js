const express = require('express');
const router = express.Router();
const clientController = require("../controller/ClienteController.js")

router.get("/clientes",  (req,res)=>{
  return clientController.findAll(req,res)
})

router.post("/clientes", (req, res) => {
    return clientController.create(req, res);
});

router.put("/clientes/:id", (req, res) => {
    return clientController.update(req, res);
});

router.delete("/clientes/:id", (req, res) => {
    return clientController.delete(req, res);
});

module.exports = router;