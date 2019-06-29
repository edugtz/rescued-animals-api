'use strict';

const express = require('express');
const api = express.Router();
const animalRoutes = require('./animalRoutes');

api.use('/animals', animalRoutes);

module.exports = api;