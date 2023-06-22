require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users');

const router = require('./routes');

const auth = require('./middlewares/auth');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(router);

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500 ? 'Ошибка сервера' : message,
  });

  next();
});

app.listen(PORT);
