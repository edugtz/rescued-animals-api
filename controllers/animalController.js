'use strict';

const { Animal, AnimalDetail } = require('../db/models');

module.exports = {
    getAnimals(req, res) {
        const include = [
            { model: AnimalDetail, as: 'animalDetail', required: true }
        ];

        return Animal
            .findAll({ include })
            .then(animals => {
                if(!animals) {
                    return Promise.reject('No animals were found');
                }

                return res.status(200).send(animals);
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    }
};