export class ClassValidatorException extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, ClassValidatorException.prototype);
  }
}
