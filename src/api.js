require('dotenv').config();
require('express-async-errors');
const express = require('express');
const errorHandler = require('./database/middlewares/errorHandler');
const loginRoute = require('./database/routes/loginRoute');
const userRoute = require('./database/routes/userRoute');
const categoriesRoute = require('./database/routes/categoriesRoute');
const postRoute = require('./database/routes/postRoute');

// ...

const app = express();

app.use(express.json());

// ...

// É importante exportar a constante `app`,
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);

app.use(errorHandler);
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
