'use strict';
module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define('Animal', {
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    color: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  Animal.associate = function(models) {
    // associations can be defined here
    Animal.hasOne(models.AnimalDetail, {
      foreignKey: 'animal_id'
    });
  };
  return Animal;
};