import bodyParser from 'body-parser';
import SwaggerUi from 'swagger-tools/middleware/swagger-ui';
import SwaggerExpress from 'swagger-express-mw';
import app from 'express';
import connectToMongo from './config/db';
import config from './config/environment';
import { tokenVerifier } from './api/utils/auth';
import { initializeApplication } from './api/utils/initializeApplication';
import logger from './api/utils/logger';

const server = app();
const { defaultDocsRoutingPath } = config;

connectToMongo();
initializeApplication();


export const init = () => {
  const routingDocsPath = process.env.ROUTING_PATH || defaultDocsRoutingPath;
  const appConfig = {
    appRoot: __dirname,
    swaggerSecurityHandlers: {
      apiKey: tokenVerifier,
    },
  };

  SwaggerExpress.create(appConfig, (err, swaggerExpress) => {
    if (err) throw err;
    server.use(bodyParser.json({ limit: '10mb' }));
    server.use(routingDocsPath, SwaggerUi(swaggerExpress.runner.swagger));
    swaggerExpress.register(server);

    server.listen(config.httpPort);
    logger.info(`Server http running at port: ${config.httpPort}`);
  });
};

export default server;
