const Cliente = require("../models/Cliente")
exports.findAll =  async (req, res)=> {
    Cliente.findAll().then( ( users)=>{
        return res.status(200).json(users)
    }).catch((e)=>{
        const ret = {
            msg : "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })
};

exports.create = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            error: 'Body is required'
        });
    }

    const { nome, endereco, telefone, email } = req.body;

    let fieldsNOTVALID = [];

    for (const field of ['nome', 'endereco', 'telefone', 'email']) {
        if (!req.body[field]) {
            fieldsNOTVALID.push(field);
        }
    }

    if (fieldsNOTVALID.length > 0) {
        return res.status(400).json({
            error: `Fields not valid: ${fieldsNOTVALID}`
        });
    }

    Cliente.create({
        nome,
        endereco,
        telefone,
        email
    }).then((cliente) => {
        return res.status(201).json({
            msg: 'Cliente cadastrado com sucesso',
            cliente
        });
    }).catch((e) => {
        const ret = {
            msg: 'Erro no banco de dados',
            exp: e
        };

        return res.status(500).json(ret);
    });
};

exports.update = async (req, res) => {

const id = req.params.id;

const { nome, endereco, telefone, email } = req.body;

Cliente.update({
    nome,
    endereco,
    telefone,
    email
}, {
    where: { id: id }
})
.then(() => {
    return res.status(200).json({
        msg: 'Cliente atualizado com sucesso'
    });
})
.catch((e) => {
    return res.status(500).json({
        msg: 'Erro ao atualizar cliente',
        exp: e
    });
});

};

exports.delete = async (req, res) => {

    const id = req.params.id;

    Cliente.destroy({
    where: { id: id }
})
.then(() => {
    return res.status(200).json({
        msg: 'Cliente excluído com sucesso'
    });
})
.catch((e) => {
    return res.status(500).json({
        msg: 'Erro ao excluir cliente',
        exp: e
    });
});

};