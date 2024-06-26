const httpStatus = require('http-status');
const wrapper = require('../utils/wrapper');
const { authService, userService, tokenService } = require('../services');

const register = wrapper(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json({ data: user });
});

const login = wrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = tokenService.generateToken(user.id);
  res.json({ data: token });
});

const loggedInUser = wrapper(async (req, res) => {
  res.json({ data: res.locals.user });
});

module.exports = {
  register,
  login,
  loggedInUser,
};
