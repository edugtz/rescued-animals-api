'use strict';

const express = require('express');
const api = express.Router();
const animalController = require('../controllers/animalController');
const multer = require('multer');
const upload = multer({});

api.get('/', animalController.getAnimals);
api.get('/:animalId', animalController.getAnimal);
api.post('/', upload.single('image'), animalController.registerAnimal);
api.delete('/:animalId', animalController.deleteAnimal);
api.put('/:animalId', upload.single('image'), animalController.updateAnimal);

module.exports = api;