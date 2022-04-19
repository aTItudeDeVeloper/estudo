const { Sequelize, DataTypes } = require('sequelize');
const database = require("../database");

const Image = database.define('images', {
      text: Sequelize.STRING,
      post_image: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
});

module.exports = Image;