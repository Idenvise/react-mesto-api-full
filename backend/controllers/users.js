const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      const {
        name, about, avatar, email, _id,
      } = user;
      res.send({
        name, about, avatar, email, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Неверный идентификатор'));
        return;
      }
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((mail) => {
      if (mail === null) {
        bcrypt.hash(password, 10)
          .then((hash) => {
            User.create({
              name, about, avatar, email, password: hash,
            })
              .then((user) => {
                res.send({
                  name: user.name,
                  about: user.about,
                  avatar: user.avatar,
                  email: user.email,
                  id: user._id,
                });
              })
              .catch((err) => {
                if (err.name === 'ValidationError') {
                  next(new ValidationError('Переданы некорректные данные'));
                  return;
                }
                next(err);
              });
          })
          .catch(next);
      } else {
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(new ValidationError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ValidationError('Неправильные почта или пароль'));
          }
          const genToken = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-giga-mega-secret-key', { expiresIn: '7d' });
          res.send({
            token: genToken,
            user: {
              email: user.email,
              _id: user._id,
              about: user.about,
              avatar: user.avatar,
              name: user.name,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Неверный идентификатор пользователя');
    })
    .then((user) => {
      const {
        name, about, avatar, email, _id,
      } = user;
      res.send({
        name, about, avatar, email, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Неверный идентификатор'));
        return;
      }
      next(err);
    });
};
