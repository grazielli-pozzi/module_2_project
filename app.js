require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');


mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err);
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
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true,
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('subtotal', (preco, qty) => preco * qty);
hbs.registerHelper('total', (itens) => {
    const itensArray = [...itens];
    let total = 0;
    itensArray.forEach((elem) => total += elem.preco * elem.quantidade);
    return total;
});

const session = require('express-session');
const connectMongo = require('connect-mongo');

const MongoStore = connectMongo(session);

app.use(session({
    secret: process.env.SECRET,
    saveUnintialized: false,
    resave: true,
    rolling: true,
    cookie: { maxAge: 240000},
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60*60*24,
    }),
}));

// default value for title local
app.locals.title = 'Burguer Expresso';

const index = require('./routes/index');
const cart = require('./routes/cart.routes');
const private = require('./routes/private.routes');

app.use('/', index);

app.use((req, res, next) => {
    if(!req.session.currentUser){
        res.redirect('/login?sessionExpired=true');
        return;
    }
    next();
});

app.use('/', cart);
app.use('/', private);

module.exports = app;
