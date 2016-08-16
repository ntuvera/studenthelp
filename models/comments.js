'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define('Comments', {
    comment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return Comments;
};