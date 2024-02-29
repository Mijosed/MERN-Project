require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken'); // Importer jsonwebtoken
const User = require('../models/user'); // Assurez-vous que le chemin vers votre modèle est correct
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configurez la stratégie Google OAuth2
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userEmail = profile.emails[0].value;
        const photoUrl = profile.photos[0].value;

        let user = await User.findOne({ email: userEmail });

        if (!user) {
          user = new User({
            email: userEmail,
            photoUrl: photoUrl
          });
          await user.save();
        } else {
          user.photoUrl = photoUrl;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = {
  googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),

  googleCallback: (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/login'); 
      }

      // Générer un JWT pour l'utilisateur
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY, // Assurez-vous que cette clé correspond à celle utilisée dans votre stratégie JWT
        { expiresIn: '12h' }
      );

      // Rediriger vers le frontend avec le token
      res.redirect(`http://localhost:3000/?token=${token}`);
    })(req, res, next);
  },

  // Modifié pour utiliser passport.authenticate avec JWT
  getUserInfo: (req, res) => {
    // Pas besoin de vérifier le token ici car Passport s'en occupe
    // Renvoie directement les informations de l'utilisateur
    res.json({
      email: req.user.email,
      roles: req.user.roles // Assurez-vous que vos modèles d'utilisateur contiennent bien ces informations
    });
  },
  
  logout: (req, res) => {
    res.json({ message: 'User logged out successfully, please clear your token' });
  },
};
