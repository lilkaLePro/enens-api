import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string

}

@InputType()
export class ConnectUserInput {
  @Field()
  email: string

  @Field()
  password: string
}