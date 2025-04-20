export class UserEmail {
  private readonly value: string;

  constructor(value: string) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(value)) {
      throw new Error('Email inválido')
    }

    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}