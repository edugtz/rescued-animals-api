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
        console.log('Logging of register');
        const include = [
            { model: AnimalDetail, as: 'animalDetail', required: true }
        ];

        const storage = require('@google-cloud/storage');
        const fs = require('fs');
        const gcs = storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.GC_KEY_FILE
        });
        console.log(gcs);
        var bucket = gcs.bucket(process.env.BUCKET);
        console.log(bucket);
        bucket.upload('sport.jpg', function(err, file) {
            if (err) throw new Error(err);
            console.log('Upload completed');
        });
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