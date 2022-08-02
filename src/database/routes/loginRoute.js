const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRoute = Router();

loginRoute.post('/', loginController.list);

module.exports = loginRoute;