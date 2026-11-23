const TipoProduto = require("../models/TipoProduto");

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

    TipoProduto.findAndCountAll({ limit, offset }).then(({ count, rows }) => {
        return res.status(200).json({
            tiposProdutos: rows,
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

    TipoProduto.findByPk(id).then((tipoProduto) => {
        if (!tipoProduto) {
            return res.status(404).json({ msg: "Tipo de produto não encontrado" });
        } else {
            return res.status(200).json(tipoProduto);
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

    TipoProduto.findByPk(id).then((tipoProduto) => {
        if (!tipoProduto) {
            return res.status(404).json({ msg: "Tipo de produto não encontrado" });
        } else {
            TipoProduto.destroy({
                where: { id }
            }).then(() => {
                return res.status(200).json({ msg: "Tipo de produto deletado com sucesso" });
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

exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body is required" });
    }

    const { nome, descricao } = req.body;

    let filedsNOTVALID = [];
    for (const field of ["nome"]) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(", ")}` });
    }

    let ab = {
        msg: "Operação realizada com sucesso",
        status: 200
    };

    TipoProduto.create({
        nome,
        descricao
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
        return res.status(400).json({ error: "Body is required" });
    }

    const { nome, descricao } = req.body;

    let filedsNOTVALID = [];
    for (const field of ["nome"]) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(", ")}` });
    }

    TipoProduto.findByPk(id).then((tipoProduto) => {
        if (!tipoProduto) {
            return res.status(404).json({ msg: "Tipo de produto não encontrado" });
        } else {
            tipoProduto.nome = nome;
            tipoProduto.descricao = descricao;

            tipoProduto.save().then(() => {
                return res.status(200).json({ msg: "Tipo de produto atualizado com sucesso" });
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