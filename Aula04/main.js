const express = require('express');
const app = express();
const port = 3000;

const sequelize = require('./models/Bd.js').sequelize;
const {User} = require('./models/User.js');

const userController = require("./controller/UserController.js")
const clienteController = require("./controller/ClienteController.js")

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
    return userController.create(req,res)
   }
);

app.delete("/user/:id",(req,res)=>{
   return userController.delete(req,res); 
})

app.get("/user/:id",(req,res)=>{
   return userController.findById(req,res);
})


app.put("/user/:id",(req,res)=>{
    return userController.update(req,res); 
})

app.get("/users",(req,res)=>{
  return userController.findAll(req,res)
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
   return clienteController.findAll(req,res);
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