import { Service } from 'typedi';
import { Exception } from '../exceptions/Exception';

@Service()
export class ValidationService {
  async validate(model: unknown) {
    throw new Exception('ERROR TEST ON VALIDATION SERVICE.');
  }
}
