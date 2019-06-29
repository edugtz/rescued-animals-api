'use strict';

module.exports.getAnimals = (req, res) => {
    const animals = ['Cat', 'Dog', 'Fish', 'Turtle'];

    return res.status(200).send({ animals });
};