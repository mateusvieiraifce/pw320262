const express = require('express');
const router = express.Router();
const tiposProdutosController = require("../controller/TiposProdutosController.js");

router.post('/tipos-produtos', (req, res) => {
    return tiposProdutosController.create(req, res);
});

router.delete("/tipos-produtos/:id", (req, res) => {
    return tiposProdutosController.delete(req, res);
});

router.get("/tipos-produtos/:id", (req, res) => {
    return tiposProdutosController.findById(req, res);
});

router.put("/tipos-produtos/:id", (req, res) => {
    return tiposProdutosController.update(req, res);
});

router.get("/tipos-produtos", (req, res) => {
    return tiposProdutosController.findAll(req, res);
});

module.exports = router;