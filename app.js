const express = require('express');
const morgan = require('morgan');
// My Imports
const routeHandlers = require('./route-handlers');
const tours = require('./preloads/tours');
// ! App
const app = express();
// !MIDDLEWARE -> 1st to make req.body available
app.use(morgan('dev'));
app.use(express.json());

// ! API ROUTES
// Tours Resource
/* app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter); */
app
  .route('/api/v1/tours')
  .get(routeHandlers.getTours)
  .post(routeHandlers.createTour);

app
  .route('/api/v1/tours/:id')
  .get(routeHandlers.getTour)
  .patch(routeHandlers.updateTour)
  .delete(routeHandlers.deleteTour);
// Users Resource
app
  .route('/api/v1/users')
  .get(routeHandlers.getUsers)
  .post(routeHandlers.createUser);

app
  .route('/api/v1/users:id')
  .get(routeHandlers.getUser)
  .patch(routeHandlers.updateUser)
  .delete(routeHandlers.deleteUser);
// Server start
const port = 3000;
app.listen(port, () => {
  console.log('Express server on port ' + port);
});
