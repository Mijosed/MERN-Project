// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
// Les modèles requis
const User = require('./models/user');
// Les routes de l'application
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const { pool, testConnection} = require('./db.config');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Importez votre configuration de Passport
require('./passport-config')(passport);

// Initialisez Passport
app.use(passport.initialize());

// Utilisez le middleware CORS pour autoriser l'origine de votre front-end
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// CONNECT DATABASE
mongoose.connect(process.env.DATABASE, {
  dbName: 'IntWeb'
})
.then(() => console.log('DB connected'))
.catch((err) => console.error('DB connection error:', err));


// Middleware pour le parsing des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Hi from Node.js');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
