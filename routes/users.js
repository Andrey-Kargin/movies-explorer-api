const usersRouter = require('express').Router();

const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUserInfo);

module.exports = usersRouter;
