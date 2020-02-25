/* tslint:disable */

import { Result, ok, err } from "../result";
import { Schema } from "../schema/schema";
import str from "../schema/string";

export class ValueObject<T> {
  static readonly schema: Schema<any>

  // abstract readonly schema: Schema<T> 
  readonly value: T
  protected constructor(value: T) {
    this.value = value
  }

  equals(other: ValueObject<T>): boolean {
    return this.value === other.value
  }
}

export class Email extends ValueObject<string> {
  static readonly schema = str({
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  })

  public static create(value: any): Result<Email> {
    const result = Email.schema.validate(value)
    if (result.isOk()) {
      return ok(new Email(value))
    }
    if (result.error.includes('match')) {
      return err(`${value} is not a valid email address`)
    }
    return err(result.error)
  }
  
  protected constructor(email: string) {
    super(email)
  }
}

export class Username extends ValueObject<string> {
  public static create(value: string): Result<Username> {
    const schema = str({
      maxLength: 15,
      minLength: 5,
      pattern: /[a-z]*[a-z]*/i
    })

    return schema.onValidate(
      value,
      username => ok(new Username(username)),
      error => err(error)
    )
  }

  protected constructor(readonly username: string) {
    super(username)
  }
}

abstract class Entity<T> {
  readonly value: T
  readonly id: string

  protected constructor(id: string, value: T) {
    this.value = value
    this.id = id
  }

  public equals(other: Entity<T>): boolean {
    return this.id === other.id
  }

  public abstract toString(): string
}

interface User {
  username: Username
  email: Email
}

export class UserEntity extends Entity<User> {
  public static create(args: { email:  string, username: string }): Result<UserEntity> {
    const email = Email.create(args.email)
    if (!email.isOk()) {
      return err(`Could not create user with email '${args.email}' -- ${email.error}`)
    }

    const username = Username.create(args.username)
    if (!username.isOk()) {
      return err(`Could not create user with username '${args.username}' -- ${username.error}`)
    }

    return ok(new UserEntity({
      email: email.value,
      username: username.value
    }))
  }
  private static id = 0
  protected constructor(user: User) {
    const id = `User__${UserEntity.id}`
    super(id, user)
    UserEntity.id++
  }

  public toString(): string {
    return `User
----
email: ${this.value.email.value}
username: ${this.value.username.value}
`
  }
}