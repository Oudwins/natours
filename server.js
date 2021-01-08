const dotenv = require('dotenv');
const mongoose = require('mongoose');

// ! Uncaught Exception === errors in synch code
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXEPTION (Synch code error)');
  console.log(err);
  process.exit(1);
});
////////

dotenv.config({ path: './config.env' });
const app = require('./app');
// !Database
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    // avoid mongoose creating indexes on app launch
    autoIndex: process.env.NODE_ENV === 'development',
  })
  .then(() => {
    console.log('connected to database');
  });

// Server start
const server = app.listen(process.env.PORT || 3000);

// !THIS HANDLES ALL ERRORS BORN OF ASYNC CODE IN NODEJS
process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED_REJECTION SUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
});
