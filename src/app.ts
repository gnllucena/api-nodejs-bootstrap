import 'reflect-metadata';
import { createExpressServer, RoutingControllersOptions, useContainer } from 'routing-controllers';
import { serve, setup } from 'swagger-ui-express';
import { DataSource } from './configurations/DataSource';
import { swagger } from './configurations/Swagger';
import dotenv from 'dotenv';
import path from 'path';
import Container from 'typedi';
import compression from 'compression';
import ExceptionHandlingMiddleware from './middlewares/ExceptionHandlingMiddleware';

dotenv.config();

const controllers = path.join(__dirname + '/controllers/*.ts');
const dataSource = DataSource.instance();

useContainer(Container);

dataSource
  .configuration()
  .initialize()
  .then(() => {
    const options: RoutingControllersOptions = {
      controllers: [controllers],
      middlewares: [ExceptionHandlingMiddleware],
      cors: true,
      classTransformer: true,
      defaultErrorHandler: true,
    };

    const app = createExpressServer(options);

    app.use('/swagger', serve, setup(swagger(options)));
    app.use(compression());

    app.listen(process.env.PORT);
  });
