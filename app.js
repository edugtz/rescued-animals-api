'use strict';

require('dotenv').config();

const port = process.env.PORT || 3030;
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/index');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

