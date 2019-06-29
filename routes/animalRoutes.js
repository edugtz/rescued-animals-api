'use strict';

const express = require('express');
const api = express.Router();
const animalController = require('../controllers/animalController');

api.get('/', animalController.getAnimals);
api.get('/:animalId', animalController.getAnimal);
api.post('/', animalController.registerAnimal);

module.exports = api;