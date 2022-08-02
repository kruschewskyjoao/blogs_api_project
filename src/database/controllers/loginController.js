const loginService = require('../services/loginService');
const authService = require('../services/authService');

const loginController = {
  /**
   * @type {import('express).RequestHandler} 
   */
  async list(req, res) {
      const { email, password } = await loginService.validateBody(req.body);
      const user = await loginService.list(email);
      await loginService.getByEmailOrThrows(email, password);
      const token = await authService.makeToken(user);
      res.status(200).json({ token });
  },
};

module.exports = loginController;
