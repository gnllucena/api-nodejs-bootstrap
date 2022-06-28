import 'reflect-metadata';
import { createExpressServer, getMetadataArgsStorage, useContainer } from 'routing-controllers';
import { serve, setup } from 'swagger-ui-express';
import { DataSource } from './configurations/DataSource';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
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
    const routingControllersOptions = {
      controllers: [controllers],
      middlewares: [],
      cors: true,
      classTransformer: true,
      defaultErrorHandler: false,
    };

    const app = createExpressServer(routingControllersOptions);

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'Generated with `routing-controllers-openapi`',
        title: 'A sample API',
        version: '1.0.0',
      },
    });

    app.use('/docs', serve, setup(spec));

    app.listen(process.env.PORT);
  });
