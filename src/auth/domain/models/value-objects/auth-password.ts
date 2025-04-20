export class UserPassword {
  private readonly value: string;

  constructor(value: string) {
    if (value.length < 6) {
      throw new Error('La contraseña debe de ser de al menos 6 caracteres como mínimo')
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}