import {
  Action,
  ExpressMiddlewareInterface,
  Interceptor,
  InterceptorInterface,
  Middleware,
} from 'routing-controllers';
import { Service } from 'typedi';
import { QueryRunner } from 'typeorm';
import { DataSource } from './DataSource';

@Middleware({ type: 'before' })
@Service()
export class StartTransactionMiddleware implements ExpressMiddlewareInterface {
  private readonly runner: QueryRunner;
  constructor() {
    this.runner = DataSource.instance().runner();
  }

  use(request: any, response: any, next: (err?: any) => any) {
    this.runner.startTransaction('READ COMMITTED');

    next();
  }
}

@Interceptor()
@Service()
export class CloseTransactionMiddleware implements InterceptorInterface {
  private readonly runner: QueryRunner;
  constructor() {
    this.runner = DataSource.instance().runner();
  }

  intercept(action: Action, content: any) {
    if (this.runner.isTransactionActive) {
      this.runner.commitTransaction();
      this.runner.release();
    }

    return content;
  }
}
