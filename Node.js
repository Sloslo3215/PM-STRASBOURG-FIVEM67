// server.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/TON_ID/TON_TOKEN';

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  const formData = new FormData();
  formData.append('file', fs.createReadStream(file.path), file.originalname);

  try {
    await axios.post(DISCORD_WEBHOOK, formData, {
      headers: formData.getHeaders(),
    });

    fs.unlinkSync(file.path); // Supprime le fichier local après envoi
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de l’envoi à Discord');
  }
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
