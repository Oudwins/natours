const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
//const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
// My Imports
const routers = require('./routes');
const AppError = require('./utilities/AppError');
const globalErrorHandler = require('./errors');
const viewsRouter = require('./routes/viewsRouter');
// ! App
const app = express();
// !set up template engine || views
app.set('view engine', 'pug');
// we use path.join to avoid bug where there is //
app.set('views', path.join(__dirname, 'views'));
// !GLOBAL MIDDLEWARE ->
// Serving static files - WORKS WITH VIEWS ENGINE
app.use(express.static(path.join(__dirname, 'public')));
// helmet npm package, adds security HTTP headers
// app.use(helmet());
// Development loggin - Morgan console logs requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// limit requests from single IP using express-rate-limit
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, try again later.',
});
app.use('/api', limiter);
//Make req.body available. Body parser.
app.use(
  express.json({
    limit: '10kb',
  })
);
// Enable parsing of cookies
app.use(cookieParser());
// Data sanitization (req.body) against noSQL qury injection
app.use(mongoSanitize());
// Data sanitization against Cross-Site Scripting Attacks (cleans for malicious html code)
app.use(xss());
//prevent parameter polution (we should get this fields from the model rather than put them here)
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
// ! API ROUTES
Object.values(routers).forEach((el) => app.use(el.resourceURL, el.router));
// ! VIEWS ROUTES
app.use(viewsRouter.url, viewsRouter.router);
// ! CATCH ALL ROUTES
app.all('*', (req, res, next) => {
  // Passing error into next (if we pass anything into next it will assume it is an error)
  next(
    new AppError(`Cannot find route ${req.originalUrl} on this server`, 404)
  );
});

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
