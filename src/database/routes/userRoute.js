const { Router } = require('express');
const userController = require('../controllers/userController');

const usersRoute = Router();

usersRoute.post('/', userController.add);
usersRoute.get('/', userController.list);
usersRoute.get('/:id', userController.listOne);

module.exports = usersRoute;