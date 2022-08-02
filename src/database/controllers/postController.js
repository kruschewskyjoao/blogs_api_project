const authService = require('../services/authService');
const postService = require('../services/postService');

const postController = {
  async add(req, res) {
    const data = await postService.validateBody(req.body);
    const token = await authService.validateHeaderToken(req.headers.authorization);
    const readT = await authService.readToken(token);
    const result = await postService.add(data, readT.id);
    return res.status(201).json(result);
  },
  async get(req, res) {
    const token = await authService.validateHeaderToken(req.headers.authorization);
    await authService.readToken(token);
    const result = await postService.get(req.body);
    return res.status(200).json(result);
  },
  async getById(req, res) {
    const token = await authService.validateHeaderToken(req.headers.authorization);
    await authService.readToken(token);
    const result = await postService.getById(req.params);
    res.status(200).json(result);
  },
};

module.exports = postController;
