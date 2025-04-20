export class UserName {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('El nombre debe ser de mínimo de 3 caracteres')
    }

    this.value = value
  }

  public getValue(): string {
    return this.value;
  }
}