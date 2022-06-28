import { RoutingControllersOptions } from 'routing-controllers';
import path from 'path';

const controllers = path.join(__dirname + './../controllers/*.ts');

export const routingControllerOptions: RoutingControllersOptions = {
  controllers: [controllers],
  middlewares: [],
  cors: true,
  classTransformer: true,
  defaultErrorHandler: false,
};
