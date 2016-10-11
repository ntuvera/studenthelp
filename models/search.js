'use strict';
module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define('Search', {
    title: DataTypes.STRING,
    url: DataTypes.STRING
      }, {
    classMethods: {
      associate: function(models) {
        Search.hasMany(models.Posts);

      }
    }
  });
  return Search;
};