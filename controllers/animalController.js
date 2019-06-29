'use strict';

const Animal = require('../db/models').Animal;

module.exports = {
    getAnimals(req, res) {
        const animals = ['Cat', 'Dog', 'Fish', 'Turtle'];
    
        return res.status(200).send({ animals });
    }
};