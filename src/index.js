const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use(routes);
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
    console.log('#### Error handler ####');
    console.log(error);
    response.sendStatus(500);
})

app.listen(8000, () => console.log('Server started at http://localhost:8000')); 