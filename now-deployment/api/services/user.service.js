// services/user.service.js

// Holds all functions used by the controller

const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

module.exports = {
  authenticate: async () => {},
  getAll: async () => {
    return await User.find().select('-hash');
  },
  getById: async id => {
    return await User.findById(id).select('-hash');
  },
  getProducts: async id => {
    return await User.findById(id)
      .select('savedProducts')
      .populate('savedProducts');
  },
  create: async userData => {
    // Validate Info
    if (await User.findOne({ email: userData.email })) {
      throw 'Email: ' + userData.email + ' is already taken';
    }

    const user = new User(userData);

    if (userData.password) user.hash = bcrypt.hashSync(userData.password, 10);

    return await user.save();
  },
  update: async (id, userData) => {
    const user = await User.findById(id);

    // Validate
    if (!user) throw 'User does not exist';
    if (
      user.email !== userData.email &&
      (await User.findOne({ email: userData.email }))
    ) {
      throw 'Email: ' + userData.email + ' is already taken';
    }

    if (userData.password) {
      userData.hash = bcrypt.hashSync(userData.password, 10);
    }

    Object.assign(user, userData);

    return await user.save();
  },
  addProduct: async (id, productId) => {
    return await User.findByIdAndUpdate(
      id,
      {
        $push: { savedProducts: productId }
      },
      { safe: true, upsert: true, new: true }
    );
  },
  _removeProduct: async (id, productId) => {
    await User.findByIdAndUpdate(
      id,
      {
        $pull: { savedProducts: { $in: productId } }
      },
      { new: true, safe: true }
    );
  },
  _remove: async id => {
    await User.findOneAndRemove(id);
  }
};
