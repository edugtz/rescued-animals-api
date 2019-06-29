'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnimalDetail = sequelize.define('AnimalDetail', {
    location: DataTypes.STRING,
    publication_date: DataTypes.DATE,
    animal_id: DataTypes.INTEGER
  }, {});
  AnimalDetail.associate = function(models) {
    // associations can be defined here
    AnimalDetail.belongsTo(models.Animal, {
        foreignKey: 'animal_id'
    });
  };
  return AnimalDetail;
};