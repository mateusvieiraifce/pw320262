const Venda = require("../models/Venda");
const User = require("../models/User");
const Produto = require("../models/Produto");

const incluir = [
    { model: User, attributes: ["id", "nome", "login"] },
    Produto
];

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

    // busca opcional: /vendas?id_user=1&id_produto=2
    const where = {};
    if (req.query.id_user) where.id_user = req.query.id_user;
    if (req.query.id_produto) where.id_produto = req.query.id_produto;

    Venda.findAndCountAll({ where, include: incluir, limit, offset }).then(({ count, rows }) => {
        return res.status(200).json({
            vendas: rows,
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

    Venda.findByPk(id, { include: incluir }).then((venda) => {
        if (!venda) {
            return res.status(404).json({ msg: "Venda não encontrada" });
        } else {
            return res.status(200).json(venda);
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

    Venda.findByPk(id).then((venda) => {
        if (!venda) {
            return res.status(404).json({ msg: "Venda não encontrada" });
        } else {
            Venda.destroy({
                where: { id }
            }).then(() => {
                return res.status(200).json({ msg: "Venda deletada com sucesso" });
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
        return res.status(400).json({ error: 'Body is required' });
    }

    const { id_user, id_produto, qtd, dataPedido } = req.body;

    let filedsNOTVALID = [];
    for (const field of ['id_user', 'id_produto', 'qtd']) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    if (!Number.isInteger(Number(qtd)) || Number(qtd) <= 0) {
        return res.status(400).json({ error: 'A quantidade deve ser um número inteiro maior que zero' });
    }

    let ab = {
        msg: `Operação realizada com sucesso`,
        status: 200
    };

    User.findByPk(id_user).then((user) => {
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        Produto.findByPk(id_produto).then((produto) => {
            if (!produto) {
                return res.status(404).json({ msg: "Produto não encontrado" });
            }

            const precoTotal = parseFloat(produto.precoVenda) * parseFloat(qtd);

            Venda.create({
                id_user,
                id_produto,
                qtd,
                precoTotal,
                dataPedido: dataPedido || new Date()
            }).then(() => {
                return res.status(201).json(ab);
            }).catch((e) => {
                ab.msg = e;
                return res.status(500).json(ab);
            });
        }).catch((e) => {
            return res.status(500).json({ msg: "Erro no banco de dados", exp: e });
        });
    }).catch((e) => {
        return res.status(500).json({ msg: "Erro no banco de dados", exp: e });
    });
}

exports.update = async (req, res) => {
    const { id } = req.params;

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { id_user, id_produto, qtd, dataPedido } = req.body;

    let filedsNOTVALID = [];
    for (const field of ['id_user', 'id_produto', 'qtd']) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    if (!Number.isInteger(Number(qtd)) || Number(qtd) <= 0) {
        return res.status(400).json({ error: 'A quantidade deve ser um número inteiro maior que zero' });
    }

    Venda.findByPk(id).then((venda) => {
        if (!venda) {
            return res.status(404).json({ msg: "Venda não encontrada" });
        }

        User.findByPk(id_user).then((user) => {
            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado" });
            }

            Produto.findByPk(id_produto).then((produto) => {
                if (!produto) {
                    return res.status(404).json({ msg: "Produto não encontrado" });
                }

                venda.id_user = id_user;
                venda.id_produto = id_produto;
                venda.qtd = qtd;
                venda.precoTotal = parseFloat(produto.precoVenda) * parseFloat(qtd);

                if (dataPedido) {
                    venda.dataPedido = dataPedido;
                }

                venda.save().then(() => {
                    return res.status(200).json({ msg: "Venda atualizada com sucesso" });
                }).catch((e) => {
                    return res.status(500).json({ msg: "Erro ao salvar", exp: e });
                });
            }).catch((e) => {
                return res.status(500).json({ msg: "Erro no banco de dados", exp: e });
            });
        }).catch((e) => {
            return res.status(500).json({ msg: "Erro no banco de dados", exp: e });
        });
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };
        return res.status(500).json(ret);
    });
}