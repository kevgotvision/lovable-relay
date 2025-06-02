const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 8080;

const N8N_WEBHOOK_URL = 'https://kevgotvision.app.n8n.cloud/webhook/265e1d3e-473a-4fd3-bde1-dbf382c12564';

app.use(express.json());

app.post('/lovable-to-n8n', async (req, res) => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const result = await response.text();
    res.status(response.status).send(result);
  } catch (error) {
    console.error('Error forwarding to n8n:', error);
    res.status(500).send('Failed to forward to n8n.');
  }
});

app.listen(PORT, () => {
  console.log(`Relay server running on port ${PORT}`);
});


