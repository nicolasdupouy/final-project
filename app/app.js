require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');
const Agent        = require("./models/Agent.js")
const Client       = require("./models/Client.js")
const bcrypt       = require('bcryptjs');
// const knex         = require('knex');

var LocalStrategy = require('passport-local').Strategy



mongoose
  .connect('mongodb://localhost/control-union', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  Agent.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// passport.deserializeUser((id, cb) => {
//   Client.findById(id, (err, user) => {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

passport.use(new LocalStrategy((username, password, next) => {
  Agent.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

// passport.use(new LocalStrategy((username, password, next) => {
//   Client.findOne({ username }, (err, user) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return next(null, false, { message: "Incorrect username" });
//     }
//     if (!bcrypt.compareSync(password, user.password)) {
//       return next(null, false, { message: "Incorrect password" });
//     }

//     return next(null, user);
//   });
// }));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'CONTROL UNION - EXPERTISE';

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const index = require('./routes/index');
app.use('/', index);

const agent = require('./routes/agent');
app.use('/auth/agent', agent);

const ship = require('./routes/ship_postgres');
app.use('/', ship);

const elements = require('./routes/elements');
app.use('/api', elements);

const dum = require('./routes/dum');
app.use('/', dum);

const workflow = require('./routes/workflow');
app.use('/', workflow);

// app.use(app.router);
// routes.initialize(app);

module.exports = app;
