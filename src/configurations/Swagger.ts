import { routingControllersToSpec } from 'routing-controllers-openapi';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';

export const swagger = (options: RoutingControllersOptions) => {
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });

  const storage = getMetadataArgsStorage();

  const swaggerOptions = routingControllersToSpec(storage, options, {
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

  return swaggerOptions;
};
