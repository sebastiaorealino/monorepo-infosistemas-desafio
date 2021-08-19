import dotenv from 'dotenv';
import _ from 'lodash';
import mongoosePaginate from 'mongoose-paginate';
import logger from '../../api/utils/logger';
import dev from './development';
import prod from './production';
import qa from './qa';
import test from './testEnv';

dotenv.config();

let env = dev;

switch (process.env.NODE_ENV) {
  case 'test':
    logger.info('Enviroment: test');
    env = test;
    break;
  case 'prod':
    logger.info('Enviroment: prod');
    env = prod;
    break;
  case 'qa':
    logger.info('Enviroment: qa');
    env = qa;
    break;

  default:
    break;
}

const all = {
  env: process.env.NODE_ENV,
  ip: process.env.IP || '0.0.0.0',
  seedDB: false,
  mongo: {
    options: {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
  paginateOptions: {
    limit: 15,
  },
  // Base url for docs
  defaultDocsRoutingPath: '/v1',
};

mongoosePaginate.paginate.options = env.paginateOptions;

export default _.merge(
  all,
  env || {},
);
