import { Field, InputType } from "@nestjs/graphql";
import { CAMPAGN_TYPE } from "../enum";

@InputType()
export class CreateCampagnInput {
  @Field()
  campagnName: string

  @Field(() => [CAMPAGN_TYPE])
  campagnType: CAMPAGN_TYPE[]

  @Field()
  description: string

  @Field()
  authorId: string

  @Field({ nullable: true })
  thumbnailUrl: string
}
