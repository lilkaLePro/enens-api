import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity({name: 'users'})
@ObjectType()
export class UserSchema {

  @Field(() => ID)
  @ObjectIdColumn({name: '_id'})
  id: ObjectId;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sessionToken?: string;
}
