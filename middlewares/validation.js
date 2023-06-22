const {
  Joi,
  celebrate,
} = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../errors/bad-request-error');

const urlValidation = (url) => {
  if (isUrl(url)) return url;
  throw new BadRequestError('Неверный URL');
};

const IdValidation = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) return id;
  throw new BadRequestError('Неверный id');
};

module.exports.loginValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation),
    trailerLink: Joi.string().required().custom(urlValidation),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports.getCurrentUserValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .custom(IdValidation),
    }),
});
