'use strict';

const animalDetailList = require('../vendor/animal-detail-list');

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('AnimalDetails', animalDetailList);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AnimalDetails', null, {});
  }
};
