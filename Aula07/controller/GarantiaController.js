const Garantia = require("../models/Garantia.js");
const Cliente = require("../models/Cliente.js");
const Servico = require("../models/Servico.js");

exports.findAll = async (req, res) => {
    Garantia.findAll({ include: [Cliente, Servico] }).then((garantias) => {
        return res.status(200).json(garantias);
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };
        return res.status(500).json(ret);
    });
};

exports.create = async (req, res) => {
    const { dataInicio, dataFim, descricao, clienteId, servicoId } = req.body;

    if (!dataInicio || !dataFim || !clienteId || !servicoId) {
        return res.status(400).json({ msg: "Campos obrigatórios: dataInicio, dataFim, clienteId, servicoId" });
    }

    Garantia.create({ dataInicio, dataFim, descricao, clienteId, servicoId }).then((garantia) => {
        return res.status(201).json(garantia);
    }).catch((e) => {
        const ret = {
            msg: "Erro ao criar garantia",
            exp: e,
        };
        return res.status(500).json(ret);
    });
};