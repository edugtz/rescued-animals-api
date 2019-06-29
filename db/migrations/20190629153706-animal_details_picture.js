'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
      'AnimalDetails',
      'picture', {
        type: Sequelize.STRING
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('AnimalDetails', 'picture');
  }
};
