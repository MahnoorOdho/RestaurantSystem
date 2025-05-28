const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String, // new field for image filename
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
