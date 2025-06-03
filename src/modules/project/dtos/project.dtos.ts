import { Field, InputType } from "@nestjs/graphql";
import { PROJECT_TYPE } from "../enum";

@InputType()
export class CreateProjectInput {
  @Field()
  projectName: string

  @Field()
  projectType: PROJECT_TYPE

  @Field()
  description: string

  @Field()
  authorId: string
}