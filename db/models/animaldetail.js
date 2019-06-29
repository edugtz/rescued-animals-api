'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnimalDetail = sequelize.define('AnimalDetail', {
    location: DataTypes.STRING,
    publication_date: DataTypes.DATE
  }, {});
  AnimalDetail.associate = function(models) {
    // associations can be defined here
    AnimalDetail.belongsTo(models.Animal, {
      foreignKey: 'animalId',
      onDelete: 'CASCADE'
    });
  };
  return AnimalDetail;
};