'use strict';

const express = require('express');
const api = express.Router();
const animalController = require('../controllers/animalController');

api.get('/', animalController.getAnimals);

module.exports = api;