const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', (req, res) => {
    const { name } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bellazaqueu@gmail.com',
            pass: 'bhyu kowz vzmv qmai' // Use a senha de app gerada
        }
    });

    const mailOptions = {
        from: 'bellazaqueu@gmail.com',
        to: 'bellazaqueu@gmail.com',
        subject: 'Confirmação de Presença',
        html: `<p>Olá, você tem uma nova confirmação de presença:<br>Nome: ${name}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email enviado: ' + info.response);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
