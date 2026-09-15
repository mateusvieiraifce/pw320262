const express = require('express');
const app = express();
const port = 3000;

const sequelize = require('./models/Bd.js').sequelize;
const {User} = require('./models/User.js');
const {Cliente} = require('./models/Cliente.js');
const {Fornecedor} = require('./models/Fornecedor.js');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {

    const ab = {
        msg: 'Hello World!',
        status: 404
    };

    return res.status(200).json(ab);
});


app.post('/salvar', (req, res) => {

    console.log(req.body);

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, email, peso, altura} = req.body;
    
    let imc = peso / (altura * altura);

    
    let filedsNOTVALID = [];
    for (const field of ['nome', 'email', 'peso', 'altura']) {
        if (!req.body[field]) {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    const ab = {
        msg: `O Imc do ${nome} (${email}) é ${imc.toFixed(2)}`,
        status: 200
    };
    
    return res.status(200).json(ab);
   }
);

app.post('/user/salvar', (req, res) => {

    
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
);

app.delete("/user/:id",(req,res)=>{

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
})

app.get("/user/:id",(req,res)=>{

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
})

app.put("/user/:id",(req,res)=>{

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
})

app.get("/users",(req,res)=>{

    User.findAll().then( ( users)=>{

        return res.status(200).json(users)
    }).catch((e)=>{
        const ret = {
            msg : "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })

})

app.post("/users/login",(req,res)=>{

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { login, password} = req.body;
    
    
    let filedsNOTVALID = [];
    for (const field of ['login', 'password']) {
        if (!req.body[field]) {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    User.findOne({
        where:{
            login,
            password
        }
    }).then((user)=>{
        if(user){
            return res.status(200).json(user);
        }else{
            return res.status(404).json({msg:"Usuario não encontrado"});
        }
    }).catch((e)=>{
        const ret = {
            msg : "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })

})  

app.get("/clientes",(req,res)=>{

    Cliente.findAll().then( ( clientes)=>{

        return res.status(200).json(clientes)
    }).catch((e)=>{
        const ret = {
            msg : "Erro no banco de dados",
            exp: e,
        }
        return res.status(500).json(ret);
    })

})


app.listen(port, () => {
    sequelize.authenticate().then(
        sequelize.sync().then(
             console.log("synconizou")).catch((e)=>{
            console.log(e)
        })
    ).catch( (e)=>{
        console.log("erro ao conectar", e)
    })
    console.log(`Server is running on http://localhost:${port}`);
});