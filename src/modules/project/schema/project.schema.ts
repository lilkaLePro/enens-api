import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { PROJECT_TYPE } from "../enum"; 

@ObjectType('Project')
@Entity({name: 'projects'})
export class ProjectSchema {
  @Field(() => ID)
  @ObjectIdColumn({name: '_id'})
  _id: ObjectId;

  @Field(() => String)
  @Column()
  projectType: PROJECT_TYPE;

  @Field()
  @Column()
  ProjectName: String;

  @Field()
  @Column()
  description: String;

  @Field(() => String)
  @Column()
  authorId: ObjectId

}