const userService = require('../services/userService');
const authService = require('../services/authService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const data = await userService.validateBody(req.body);
    await userService.verifyEmailExists(data.email);
    const user = await userService.add(data);
    const token = await authService.makeToken(user);
    console.log(token);
    return res.status(201).json({ token });
  },
  async list(req, res) {
    const token = await authService.validateHeaderToken(req.headers.authorization);
    await authService.readToken(token);
    const user = await userService.list();
    res.status(200).json(user);
  },
  async listOne(req, res) {
    const token = await authService.validateHeaderToken(req.headers.authorization);
    await authService.readToken(token);
    const { id } = req.params;
    const result = await userService.listOne(id);
    res.status(200).json(result);
  },
};

module.exports = userController;
