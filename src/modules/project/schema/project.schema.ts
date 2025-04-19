import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { PROJECT_TYPE } from "../dtos/project.dtos";

@ObjectType('Project')
@Entity({name: 'projects'})
export class ProjectSchema {
  @Field(() => ID)
  @ObjectIdColumn({name: '_id'})
  id: ObjectId;

  @Field(() => String)
  @Column()
  projectType: PROJECT_TYPE;

  @Field()
  @Column()
  ProjectName: string;

  @Field()
  @Column()
  description: string;

}