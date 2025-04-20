export class EmailAlreadyExistsException extends Error {
  constructor() {
    super('El email ya está en uso.');
    this.name = 'EmailAlreadyExistsException';
  }
}
