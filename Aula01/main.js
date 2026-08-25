const express = require('express');
const app = express();
const port = 3000;

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

app.post('/:a/:b', (req, res) => {
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

    const { nome, email, peso, altura} = req.body;
    
    let imc = peso / (altura * altura);

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }
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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});