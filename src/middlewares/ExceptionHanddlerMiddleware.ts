import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ExceptionHanddlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('do something...');
  }
}
