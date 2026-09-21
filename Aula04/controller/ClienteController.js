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
}