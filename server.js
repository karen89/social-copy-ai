const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/gerar', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                messages: [
                    { role: 'user', content: prompt }
                ]
            })
        });

        const data = await response.json();
        res.json(data);

    } catch (erro) {
        res.status(500).json({ error: 'Erro ao chamar a API' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});