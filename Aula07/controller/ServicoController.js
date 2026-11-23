
const Servico = require("../models/Servico");

exports.create = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { descricao, preco } = req.body;

    let fieldsNOTVALID = [];

    for (const field of ['descricao', 'preco']) {
        if (req.body[field] === undefined || 
            req.body[field] === null || 
            req.body[field] === '') {
            fieldsNOTVALID.push(field);
        }
    }

    if (fieldsNOTVALID.length > 0) {
        return res.status(400).json({
            error: `Fields not valid: ${fieldsNOTVALID.join(', ')}`
        });
    }

    if (isNaN(preco) || Number(preco) < 0) {
        return res.status(400).json({
            error: 'Preço inválido'
        });
    }

    let ab = {
        msg: "Operação realizada com sucesso",
        status: 200
    };

    Servico.create({
        descricao,
        preco
    }).then((servico) => {
        return res.status(201).json({
            msg: ab.msg,
            servico
        });
    }).catch((e) => {
        ab.msg = "Erro ao cadastrar serviço";
        return res.status(500).json(ab);
    });
}


exports.findAll = async (req, res) => {

    let page = 1;
    let limit = 5;

    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    const offset = (page - 1) * limit;

    Servico.findAndCountAll({ limit, offset }).then(({ count, rows }) => {
        return res.status(200).json({
            servicos: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit)
            }
        });
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };

        return res.status(500).json(ret);
    });
}


exports.findById = async (req, res) => {
    const { id } = req.params;

    Servico.findByPk(id).then((servico) => {
        if (!servico) {
            return res.status(404).json({ msg: "Serviço não encontrado" });
        } else {
            return res.status(200).json(servico);
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };

        return res.status(500).json(ret);
    });
}


exports.update = async (req, res) => {
    const { id } = req.params;

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { descricao, preco } = req.body;

    let fieldsNOTVALID = [];

    for (const field of ['descricao', 'preco']) {
        if (req.body[field] === undefined ||
            req.body[field] === null ||
            req.body[field] === '') {
            fieldsNOTVALID.push(field);
        }
    }

    if (fieldsNOTVALID.length > 0) {
        return res.status(400).json({
            error: `Fields not valid: ${fieldsNOTVALID.join(', ')}`
        });
    }

    if (isNaN(preco) || Number(preco) < 0) {
        return res.status(400).json({
            error: 'Preço inválido'
        });
    }

    Servico.findByPk(id).then((servico) => {
        if (!servico) {
            return res.status(404).json({ msg: "Serviço não encontrado" });
        } else {
            servico.descricao = descricao;
            servico.preco = preco;

            servico.save().then(() => {
                return res.status(200).json({
                    msg: "Serviço atualizado com sucesso"
                });
            }).catch((e) => {
                return res.status(500).json({
                    msg: "Erro ao atualizar serviço",
                    exp: e
                });
            });
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };

        return res.status(500).json(ret);
    });
}


exports.delete = async (req, res) => {
    const { id } = req.params;

    Servico.findByPk(id).then((servico) => {
        if (!servico) {
            return res.status(404).json({ msg: "Serviço não encontrado" });
        } else {
            Servico.destroy({
                where: { id }
            }).then(() => {
                return res.status(200).json({
                    msg: "Serviço deletado com sucesso"
                });
            }).catch((e) => {
                const ret = {
                    msg: "Erro no banco de dados",
                    exp: e,
                };

                return res.status(500).json(ret);
            });
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };

        return res.status(500).json(ret);
    });
}


