import { InterceptorInterface, Action, Interceptor } from 'routing-controllers';
import { Service } from 'typedi';

@Interceptor()
@Service()
export default class TransactionMiddleware implements InterceptorInterface {
  intercept(action: Action, content: any) {
    action.next();
  }
}

//implements ExpressMiddlewareInterface {
//   private readonly connection: EntityManager;
//   constructor() {
//     this.connection = DataSource.instance().configuration().manager;
//   }

//   use(request: any, response: any, next: (err?: any) => any): void {
//     console.log('before');

//     this.connection.

//     next();
//   }
// }
