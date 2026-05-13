const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

app.listen(8000, () => console.log('Server started at http://localhost:8000')); 