const { Router } = require('express');
const postController = require('../controllers/postController');

const postRoute = Router();

postRoute.post('/', postController.add);
postRoute.get('/', postController.get);
postRoute.get('/:id', postController.getById);

module.exports = postRoute;
