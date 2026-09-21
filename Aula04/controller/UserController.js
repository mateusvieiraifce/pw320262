const User = require("../models/User")

exports.findAll =  async (req, res)=> {
     
    User.findAll().then( ( users)=>{
        return res.status(200).json(users)
    }).catch((e)=>{
        const ret = {
            msg : "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })
}

exports.findById = async (req, res)=> {

    const { id } = req.params;
    User.findByPk(id).then((user)=>{
        if(!user){
            return res.status(404).json({msg:"Usuario não encontrado"});
        } else {
            return res.status(200).json(user);
        }
    }).catch((e)=>{
        const ret = {
            msg : "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })  
}

exports.delete =  async (req, res)=> {
     const { id } = req.params;
    
        User.findByPk(id).then((user)=>{
            if(!user){
                return res.status(404).json({msg:"Usuario não encontrado"});
            } else {
                User.destroy({
                    where:{
                        id
                    }
                }).then(()=>{
                    return res.status(200).json({msg:"Usuario deletado com sucesso"});
                }).catch((e)=>{
                    const ret = {
                        msg : "Erro no banco de dados",
                        exp: e,
                    }
                    return res.status(500).json(ret);
                })      
            }
        }).catch((e)=>{
            const ret = {
                msg : "Erro no banco de dados",
                exp: e,
            }
            return res.status(500).json(ret);
        }) 
}

exports.create = async (req, res)=> {
 if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, login, password} = req.body;
    
    
    let filedsNOTVALID = [];
    for (const field of ['nome', 'login', 'password']) {
        if (!req.body[field]) {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    let ab = {
        msg: `Operação realizada com sucesso`,
        status: 200
        };
     User.create( {
        nome, 
        login,
        password
      }).then( ()=>{
           return res.status(201).json(ab);
      }).catch((e)=>{
            ab.msg  = e;
            return res.status(500).json(ab);
      });

}

exports.update = async (req, res)=> {
const { id } = req.params;

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, login, password} = req.body;
    
    
    let filedsNOTVALID = [];
    for (const field of ['nome', 'login', 'password']) {
        if (!req.body[field]) {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }


    User.findByPk(id).then((user)=>{
        if(!user){
            return res.status(404).json({msg:"Usuario não encontrado"});
        } else {

            user.nome = nome;
            user.login = login;
            user.password = password;

            user.save().then(()=>{
                return res.status(200).json({msg:"Usuario atualizado com sucesso"});
            }).catch((e)=>{
                return res.status(500).json(user);
        })
            
        }
    }).catch((e)=>{
        const ret = {
            msg : "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    }) 

}
