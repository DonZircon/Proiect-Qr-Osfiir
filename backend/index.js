const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./key.json');

// Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//referinta db
const db = admin.firestore();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// Ruta pentru Home
app.get('/api/home', async (req, res) => {
    // Aici vom putea citi din baza de date pe viitor
    res.json({
        title: "Bine ai venit pe Home Page!",
        message: "Aceasta este pagina principală a proiectului Proiect-Qr-Osfiir.",
        status: "success"
    });
});

// Ruta pentru About Us
app.get('/api/about', async (req, res) => {
    res.json({
        title: "Despre Noi",
        description: "Suntem o echipă pasionată de tehnologie și QR codes.",
        contact: "contact@osfiir.ro"
    });
});

app.listen(PORT, () => {
    console.log(`Serverul Backend rulează pe portul ${PORT}`);
});