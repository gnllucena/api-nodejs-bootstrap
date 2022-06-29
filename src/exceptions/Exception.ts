export class Exception extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, Exception.prototype);
  }
}
