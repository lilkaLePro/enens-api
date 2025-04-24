import { Field, InputType } from "@nestjs/graphql";
import { PROJECT_TYPE } from "../enum";

@InputType()
export class createProjectInput {
  @Field()
  projectName: string

  @Field()
  projectType: PROJECT_TYPE

  @Field()
  description: string

  @Field()
  userId: string
}