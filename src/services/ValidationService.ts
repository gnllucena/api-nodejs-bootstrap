import { validate, ValidationError } from 'class-validator';
import { Service } from 'typedi';
import { ClassValidatorException } from './../exceptions/ClassValidatorException';

@Service()
export class ValidationService {
  async validate(model: unknown) {
    await validate(model).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        throw new ClassValidatorException(errors.toString());
      }
    });
  }
}
