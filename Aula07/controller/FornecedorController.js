
const { Fornecedor } = require("../models/Fornecedor.js");

exports.findAll = async (req, res) => {
    Fornecedor.findAll().then((fornecedores) => {
        return res.status(200).json(fornecedores);
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })
}

exports.findById = async (req, res) => {
    const { id } = req.params;

    Fornecedor.findByPk(id).then((fornecedor) => {
        if (!fornecedor) {
            return res.status(404).json({ msg: "Fornecedor não encontrado" });
        } else {
            return res.status(200).json(fornecedor);
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })
}

exports.delete = async (req, res) => {
    const { id } = req.params;

    Fornecedor.findByPk(id).then((fornecedor) => {
        if (!fornecedor) {
            return res.status(404).json({ msg: "Fornecedor não encontrado" });
        } else {
            Fornecedor.destroy({
                where: {
                    id
                }
            }).then(() => {
                return res.status(200).json({ msg: "Fornecedor deletado com sucesso" });
            }).catch((e) => {
                const ret = {
                    msg: "Erro no banco de dados",
                    exp: e,
                }
                return res.status(500).json(ret);
            })
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })
}

exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, endereco, cnpj, ie, telefone, email } = req.body;

    let fieldsNOTVALID = [];

    for (const field of ['nome', 'endereco', 'cnpj', 'ie', 'telefone', 'email']) {
        if (!req.body[field]) {
            fieldsNOTVALID.push(field);
        }
    }

    if (fieldsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${fieldsNOTVALID.join(', ')}` });
    }

    let ab = {
        msg: `Operação realizada com sucesso`,
        status: 200
    };

    Fornecedor.create({
        nome,
        endereco,
        cnpj,
        ie,
        telefone,
        email,
    }).then(() => {
        return res.status(201).json(ab);
    }).catch((e) => {
        ab.msg = e;
        return res.status(500).json(ab);
    });
}

exports.update = async (req, res) => {
    const { id } = req.params;

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, endereco, cnpj, ie, telefone, email } = req.body;

    let fieldsNOTVALID = [];

    for (const field of ['nome', 'endereco', 'cnpj', 'ie', 'telefone', 'email']) {
        if (!req.body[field]) {
            fieldsNOTVALID.push(field);
        }
    }

    if (fieldsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${fieldsNOTVALID.join(', ')}` });
    }

    Fornecedor.findByPk(id).then((fornecedor) => {
        if (!fornecedor) {
            return res.status(404).json({ msg: "Fornecedor não encontrado" });
        } else {
            fornecedor.nome = nome;
            fornecedor.endereco = endereco;
            fornecedor.cnpj = cnpj;
            fornecedor.ie = ie;
            fornecedor.telefone = telefone;
            fornecedor.email = email;

            fornecedor.save().then(() => {
                return res.status(200).json({ msg: "Fornecedor atualizado com sucesso" });
            }).catch((e) => {
                const ret = {
                    msg: "Erro ao atualizar fornecedor",
                    exp: e,
                }
                return res.status(500).json(ret);
            })
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })
}
