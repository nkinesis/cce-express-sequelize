var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var drinksRouter = require('./routes/drinks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* BEGIN db initialization */
const Op = {}
const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");
const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});
/* END db initialization */

const User = require("./models/user.model")(connection, Sequelize);
User.sync({ force: false, alter: true });

const UserType = require("./models/userType.model")(connection, Sequelize);
UserType.hasOne(User);
UserType.sync({ force: false, alter: true });

const Drink = require("./models/drink.model")(connection, Sequelize);
Drink.sync({ alter: true }).then(() => {
  return Drink.count()
}).then((count) => {
  // if there are zero records, create some records
  if (count == 0) {
    Drink.bulkCreate([
      {
        "name": "Vanilla Latte",
        "image": "coffee1.png",
        "rating": 4.8,
        "count": "21k",
        "type": "coffee"
      },
      {
        "name": "Espresso",
        "image": "coffee2.png",
        "rating": 4.8,
        "count": "12k",
        "type": "coffee"
      },
      {
        "name": "Hazelnut Latte",
        "image": "coffee3.png",
        "rating": 4.8,
        "count": "23k",
        "type": "coffee"
      },
      {
        "name": "Iced Peach Tea",
        "image": "drink1.png",
        "rating": 4.2,
        "count": "10k",
        "type": "tea"
      },
      {
        "name": "Banana Milkshake",
        "image": "drink2.png",
        "rating": 4.9,
        "count": "30k",
        "type": "other"
      },
      {
        "name": "Lemonade",
        "image": "drink3.png",
        "rating": 3.9,
        "count": "10k",
        "type": "juice"
      }
    ])
    console.log("Data created!")
  }
})

module.exports = app;
