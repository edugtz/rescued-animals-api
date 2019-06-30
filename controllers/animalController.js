'use strict';

const { Animal, AnimalDetail } = require('../db/models');

module.exports = {
    getAnimal(req, res) {
        const { animalId } = req.params;
        const include = [
            { model: AnimalDetail, as: 'animalDetail', required: true }
        ];

        return Animal
            .findByPk(animalId, { include })
            .then(animal => {
                if(!animal) {
                    return res.status(404).send({
                        message: 'Animal not found',
                    });
                }

                return res.status(200).send(animal);
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    },
    getAnimals(req, res) {
        const include = [
            { model: AnimalDetail, as: 'animalDetail', required: true }
        ];

        return Animal
            .findAll({ include })
            .then(animals => {
                if(!animals) {
                    return res.status(404).send({
                        message: 'No animals found',
                    });
                }

                return res.status(200).send(animals);
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    },
    registerAnimal(req, res) {
        const include = [
            { model: AnimalDetail, as: 'animalDetail', required: true }
        ];

        // return Animal
        //     .findAll({ include })
        //     .then(animals => {
        //         if(!animals) {
        //             return res.status(404).send({
        //                 message: 'No animals found',
        //             });
        //         }

        //         return res.status(200).send(animals);
        //     })
        //     .catch(err => {
        //         return res.status(400).send(err);
        //     });
    }
};