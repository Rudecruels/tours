const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) Middlewares

if (process.env.NODE_ENV === 'developmet') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  //   const err = new Error(`can't find ${req.originalUrl} in the server`);
  //   err.status = 'fail';
  //   err.statusCode = 404;
  next(new AppError(`can't find ${req.originalUrl} in the server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
