import { Field, ID, InputType, registerEnumType } from "@nestjs/graphql";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}
registerEnumType(Role, {
  name: 'Role',
  description: 'The role of the user in the system',
});

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

  @Field(() => Role)
  role: Role

  @Field({nullable: true})
  sessionToken?: string
}

@InputType()
export class ConnectUserInput {
  @Field()
  email: string

  @Field()
  password: string
}