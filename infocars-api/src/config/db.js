import mongoose from 'mongoose';
import config from './environment';
import logger from '../api/utils/logger';

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.set('debug', true);
}

function connectToMongo() {
  return mongoose.connect(config.mongo.uri, { useFindAndModify: false });
}

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected!');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected!');
  connectToMongo();
});

mongoose.connection.once('openUri', () => {
  if (process.env.NODE_ENV !== 'production') {
    logger.info('mongodb connection opened!');
  }
});

export default connectToMongo;
