'use strict';

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/index');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', api);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

