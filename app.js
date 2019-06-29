'use strict';

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const api = require('./routes/index');
const app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

