import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { ClassValidatorException } from '../exceptions/ClassValidatorException';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export default class ExceptionHandlingMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('Instance of Wiston!!!!');

    if (error instanceof Error) {
      if (error instanceof ClassValidatorException) {
        console.log('[ClassValidatorException]: ' + error.message);
      }
    }

    next(error);
  }
}
