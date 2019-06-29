'use strict';

const { Animal, AnimalDetail } = require('../db/models');
// const AnimalDetail = require('../db/models').AnimalDetail;

module.exports = {
    getAnimals(req, res) {
        // console.log('gets here');
        const include = [
            { model: AnimalDetail, required: true }
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
                // return res.status(400).send(err);
            });
    
        // return res.status(200).send({ animals });
    }
};