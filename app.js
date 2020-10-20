const express = require('express');
const morgan = require('morgan');
// My Imports
const routers = require('./routes');
// ! App
const app = express();
// !MIDDLEWARE -> 1st to make req.body available
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ! API ROUTES
Object.values(routers).forEach((el) => app.use(el.resourceURL, el.router));

/* for (router in routers) {
  app.use(routers[router].resourceURL, routers[router].router);
} */

module.exports = app;
