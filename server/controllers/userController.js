const User = require('../models/user');

const userController = {
  getAllUsers: async (req, res) => {
    try {
        const utilisateurs = await User.find();
        res.json(utilisateurs);
      } catch (erreur) {
        res.json({ message: erreur.message });
      }
  },
  register: async (req, res) => {
    try {
      const { email, roles } = req.body;
  
      // Vérifiez si l'utilisateur existe déjà dans la base de données
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
      }
  
      // Créez un nouvel utilisateur avec les données du formulaire
      const newUser = new User({ email, roles });
  
      // Enregistrez l'utilisateur dans la base de données
      await newUser.save();
  
      res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params; // Assurez-vous que l'ID est envoyé en tant que paramètre dans la requête
      const { email, roles, status } = req.body;
  
      // Trouver l'utilisateur par ID et mettre à jour
      const updatedUser = await User.findByIdAndUpdate(id, { email, roles, status }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      res.json({ message: 'Utilisateur mis à jour avec succès.', user: updatedUser });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
  },
  userCount: async (req, res) => {
    try {
      const userCount = await User.countDocuments({});
      res.json({ userCount });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  
};

module.exports = userController;