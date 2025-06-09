import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PROJECT_TYPE } from '../enum';

@ObjectType('Project')
@Entity({ name: 'projects' })
export class ProjectSchema {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => String)
  @Column()
  projectType: PROJECT_TYPE;

  @Field()
  @Column()
  ProjectName: string;

  @Field()
  @Column()
  description: string;

  @Field(() => ID)
  @Column()
  authorId: ObjectId;

  @Field(() => String)
  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Field(() => String)
  @Column({ nullable: true })
  objectifAmount?: string;
}
