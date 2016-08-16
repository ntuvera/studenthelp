'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      //Add altering commands here.
      //Return a promise to correctly handle asynchronicity.
      return queryInterface.bulkInsert('Categories', [{
        title: 'Shout Outs!',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Share Success',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Code Snippets',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Helpful Resources',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
