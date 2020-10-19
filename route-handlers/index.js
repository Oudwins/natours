const toursModule = require('./tours');
const usersModule = require('./users');

module.exports = {
  ...toursModule,
  ...usersModule,
};
