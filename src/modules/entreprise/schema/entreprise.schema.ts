import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: 'entreprise' })
@ObjectType()
export class EntrepriseSchema {
  @Field()
  @ObjectIdColumn()
  _id: ObjectId

  @Field()
  @ObjectIdColumn()
  entrepriseName: string

  @Field()
  @ObjectIdColumn()
  EntrepriseDescription: string

  @Field()
  @ObjectIdColumn()
  authorId: string

  @Field()
  @ObjectIdColumn()
  coworkers: string[]
}