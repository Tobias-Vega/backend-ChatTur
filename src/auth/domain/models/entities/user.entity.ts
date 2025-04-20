import { UserProps } from "../interfaces/auth.interface";
import { UserEmail, UserId, UserName, UserPassword } from "../value-objects";

export class User {
  private readonly id: UserId;
  private readonly name: UserName;
  private readonly email: UserEmail;
  private readonly password: UserPassword;

  constructor(props: UserProps) {
    this.id = new UserId(props.id);
    this.name = new UserName(props.name);
    this.email = new UserEmail(props.email);
    this.password = new UserPassword(props.password);
  }

  public getId(): string {
    return this.id.getValue();
  }

  public getName(): string {
    return this.name.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getPassword(): string {
    return this.password.getValue();
  }
}