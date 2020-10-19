const express = require('express');
const morgan = require('morgan');
// My Imports
const routers = require('./routes');
// ! App
const app = express();
// !MIDDLEWARE -> 1st to make req.body available
app.use(morgan('dev'));
app.use(express.json());

// ! API ROUTES
for (router in routers) {
  app.use(routers[router].resourceURL, routers[router].router);
}
// Users Resource

// Server start
const port = 3000;
app.listen(port, () => {
  console.log('Express server on port ' + port);
});
