import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { DataSource } from './configurations/DataSource';
import dotenv from 'dotenv';
import path from 'path';
import Container from 'typedi';

dotenv.config();

const controllers = path.join(__dirname + '/controllers/*.ts');
const dataSource = DataSource.instance();

useContainer(Container);

dataSource
  .configuration()
  .initialize()
  .then(() => {
    createExpressServer({
      controllers: [controllers],
      middlewares: [],
      cors: true,
      classTransformer: true,
      defaultErrorHandler: false,
    }).listen(process.env.PORT);
  });
