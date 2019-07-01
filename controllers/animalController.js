'use strict';

const { Animal, AnimalDetail } = require('../db/models');
const s3 = require('../helper/s3');

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
        const { name, species, breed, age, color, location } = req.body;

        if(!name || !species || !breed || !age || !color || !location) {
            return res.status(400).send({
                message: 'Some of the fields might be missing. Please verify.',
            });
        }

        let animalData = req.body;

        s3.uploadFile(req.file)
            .then(data => {
                return data.Location;    
            })
            .then(imageUrl => {
                return Animal
                    .create(animalData)
                    .then(createdAnimal => {
                        const animalDetailData = {
                            publication_date: new Date(),
                            location: req.body.location,
                            animal_id: createdAnimal.id,
                            picture: imageUrl
                        };
                        
                        return AnimalDetail
                            .create(animalDetailData)
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
    },
    deleteAnimal(req, res) {
        const { animalId } = req.params;
        const include = [
            { model: AnimalDetail, as: 'animalDetail', required: true }
        ];

        let imageToDelete;

        return Animal
            .findByPk(animalId, { include })
            .then(animal => {
                if(!animal) {
                    return res.status(404).send({
                        message: 'Animal not found',
                    });
                }

                imageToDelete = String(animal.animalDetail.picture).toLowerCase().split('.com/').pop();
                return s3.deleteFile(imageToDelete)
                    .then(() => {
                        return animal
                            .destroy()
                            .then(() => {
                                return res.status(200).send({
                                    message: 'Animal was successfully deleted'
                                });
                            })
                            .catch(err => {
                                return res.status(400).send(err);
                            });
                    })
                    .catch(err => {
                        return res.status(400).send(err);
                    });
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    },
    updateAnimal(req, res) {
        const { animalId } = req.params;    
        const include = [
            { model: AnimalDetail, as: 'animalDetail', required: true }
        ];
        let imageToDelete;
        let newImageUrl;
        let animalFound;

        return Animal
            .findByPk(animalId, { include })
            .then(animal => {
                if(!animal) {
                    return res.status(404).send({
                        message: 'Animal not found',
                    });
                }

                imageToDelete = String(animal.animalDetail.picture).toLowerCase().split('.com/').pop();
                animalFound = animal;  
            })
            .then(() => {
                if(req.file) {
                    console.log(imageToDelete);
                    return s3.deleteFile(imageToDelete)
                        .then(() => {
                            console.log('gets here');
                            return s3.uploadFile(req.file)
                                .then(data => {
                                    newImageUrl = data.Location;
                                })
                                .catch(err => {
                                    return res.status(400).send(err);
                                });
                        })
                        .catch(err => {
                            return res.status(400).send(err);
                        });
                }

                return true;
            })
            .then(() => {
                const updatedData = req.body;

                return animalFound
                    .update(updatedData)
                    .then(() => {
                        const newAnimalDetailData = {
                            location: req.body.location
                        };
                        if(req.file) {
                            newAnimalDetailData.picture = newImageUrl;
                        }

                        return animalFound.animalDetail
                            .update(newAnimalDetailData)
                            .then(() => {
                                return res.status(200).send({
                                    message: 'Successfully updated animal'
                                });
                            })
                            .catch(err => {
                                return res.status(400).send(err);
                            });
                    })
                    .catch(err => {
                        return res.status(400).send(err);
                    });
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    }
};