const express = require('express');
const app = express();
const port = 3000;
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("pw3","root","",{
    host:"localhost",
    dialect:"mysql",
    logging:false

});

const User = sequelize.define("User",{
    id:{ type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nome:{ type:DataTypes.STRING(100),
           allowNull:false,
    },
    login:{ type:DataTypes.STRING(10),
           allowNull:false,
    },

    password:{ type:DataTypes.STRING(10),
           allowNull:false,
    }
});


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

app.get('/:a/:b', (req, res) => {
    const { a, b } = req.params;

    const ab = {
        msg: 'Hello World!',
        soma: parseInt(a) + parseInt(b),
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