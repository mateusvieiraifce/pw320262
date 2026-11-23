
const express = require('express');
const router = express.Router();
const servicoController = require("../controller/ServicoController.js");

router.post('/servicos', (req, res) => {
    return servicoController.create(req, res);
});

router.delete("/servicos/:id", (req, res) => {
    return servicoController.delete(req, res);
});

router.get("/servicos/:id", (req, res) => {
    return servicoController.findById(req, res);
});

router.put("/servicos/:id", (req, res) => {
    return servicoController.update(req, res);
});

router.get("/servicos", (req, res) => {
    return servicoController.findAll(req, res);
});

module.exports = router;
