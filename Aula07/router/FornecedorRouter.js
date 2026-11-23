const express = require('express');
const router = express.Router();
const fornecedorController = require("../controller/FornecedorController.js");

router.post('/fornecedores', (req, res) => {
    return fornecedorController.create(req, res);
});

router.delete("/fornecedores/:id", (req, res) => {
    return fornecedorController.delete(req, res);
});

router.get("/fornecedores/:id", (req, res) => {
    return fornecedorController.findById(req, res);
});

router.put("/fornecedores/:id", (req, res) => {
    return fornecedorController.update(req, res);
});

router.get("/fornecedores", (req, res) => {
    return fornecedorController.findAll(req, res);
});

module.exports = router;