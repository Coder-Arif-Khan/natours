const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // console.log(err);
  // server.close(() => {
  //   process.exit(1);
  // });
  process.exit(1);
});

dotenv.config({ path: './config.env' }); // set to process var and can be used anywhere in file
const app = require('./app');

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('Database Connection Successful!');
  });
// .catch((err) => console.log('Error'));

// console.log(app.get('env')); // Express Environment Variables
// console.log(process.env); // NodeJs Environment Variables

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

//Testing NDB and writing this line from ndb

// Handling globally unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // console.log(err);
  server.close(() => {
    process.exit(1);
  });
  // process.exit(1);
});
