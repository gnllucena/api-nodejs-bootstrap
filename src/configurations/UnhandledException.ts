import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Exception } from '../exceptions/Exception';
import { Service } from 'typedi';
import { QueryRunner } from 'typeorm';
import { DataSource } from './DataSource';

@Middleware({ type: 'after' })
@Service()
export default class UnhandledException implements ExpressErrorMiddlewareInterface {
  private readonly runner: QueryRunner;
  constructor() {
    this.runner = DataSource.instance().runner();
  }

  error(error: any, request: any, response: any, next: (err?: any) => any) {
    if (this.runner.isTransactionActive) {
      this.runner.rollbackTransaction();
      this.runner.release();
    }

    console.log('[KABUM WINSTON PLEASE!!!!!]: ' + error);

    if (error instanceof Error) {
      let handled = false;

      if (error instanceof Exception) {
        handled = true;
        console.log('[THROWN EXCEPTION]: ' + error.message);
      }

      if (!handled) {
        console.log('[KABUM]: ' + error);
      }
    }

    response.status(499).send(error.message ?? error);
  }
}
