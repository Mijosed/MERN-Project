require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user'); // Assurez-vous que le chemin vers votre modèle est correct

module.exports = function(passport) {
// Options de configuration pour la stratégie JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY, // Clé secrète pour vérifier la signature du JWT
};

// Configuration de la stratégie JWT
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    // Recherche de l'utilisateur dans la base de données en utilisant l'ID du JWT
    const user = await User.findById(jwt_payload.id);

    if (user) {
      // Si l'utilisateur est trouvé, retournez-le
      return done(null, user);
    } else {
      // Si l'utilisateur n'est pas trouvé, retournez false
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));
};