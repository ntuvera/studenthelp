'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      //Add altering commands here.
      //Return a promise to correctly handle asynchronicity.
      return queryInterface.bulkInsert('Categories', [{
        title: 'Shout Outs!',
        url: 'shoutouts',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Share Success',
        url: 'success',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Code Snippets',
        url: 'snippets',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Helpful Resources',
        url: 'resources',
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
