'use strict';

const { Animal, AnimalDetail } = require('../db/models');
const s3 = require('../helper/s3');
const fs = require('fs');
const path = require('path');


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
        if(!req.body) {
            return res.status(400).send({
                message: 'Fields cannot be empty',
            });
        }

        let animalData = req.body;
        // console.log(req.body.name);

        s3.uploadFile(req.file)
            .then(data => {
                return data.Location;    
            })
            .then(imageUrl => {
                return Animal.create(animalData)
                    .then(createdAnimal => {
                        const animalDetailData = {
                            publication_date: new Date(),
                            location: req.body.location,
                            animal_id: createdAnimal.id,
                            picture: imageUrl
                        };
                        
                        return AnimalDetail.create(animalDetailData)
                            .then(animalDetail => {
                                if(!animalDetail) {
                                    return res.status(400).send({
                                        message: 'There was an error',
                                    }); 
                                }

                                return res.status(200).send({
                                    message: 'Animal successfully registered'
                                });
                            })
                            .catch(err => {
                                return res.status(400).send(err);
                            });
                    });
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    }
};