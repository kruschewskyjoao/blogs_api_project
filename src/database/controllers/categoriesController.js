const categoriesService = require('../services/categoriesService');
const authService = require('../services/authService');

 const categoriesController = {
  async add(req, res) {
    const validBody = await categoriesService.validateBody(req.body);
    const token = await authService.validateHeaderToken(req.headers.authorization);
    await authService.readToken(token);
    const result = await categoriesService.add(validBody);
    res.status(201).json(result);
  },
  async listAll(req, res) {
    const token = await authService.validateHeaderToken(req.headers.authorization);
    await authService.readToken(token);
    const result = await categoriesService.listAll();
    res.status(200).json(result);
  },
 };

module.exports = categoriesController;