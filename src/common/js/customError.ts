export default class CustomError extends Error {
  constructor(name: string, message: string) {
    if (typeof message === 'object') {
      message = JSON.stringify(message);
    }
    super(message);
    this.name = name;
    this.message = message;
  }
}
