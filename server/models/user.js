// models/user.js

const mongoose = require('mongoose');

// Définir le schéma du modèle
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  photoUrl: { type: String },
  roles: { type: [String], enum: ['user', 'admin'], default: ['user'] },
  status: { type: [String], enum: ['active', 'inactive'], default: ['active'] },
  lastLogin: { type: Date },
  isDeleted: { type: Boolean, default: false }
  //googleId: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
// Créer et exporter le modèle
module.exports = User;
