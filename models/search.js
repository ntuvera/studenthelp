'use strict';
module.exports = function(sequelize, DataTypes) {
  var search = sequelize.define('search', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    score: DataTypes.INTEGER,
    description: DataTypes.STRING,
    snippet: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Posts.hasMany(models.Comments);
      }
    }
  });
  return search;
};