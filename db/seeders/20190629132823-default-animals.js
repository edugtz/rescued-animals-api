'use strict';

const animalList = require('../vendor/animal-list');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Animals', animalList);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Animals', null, {});
  }
};
