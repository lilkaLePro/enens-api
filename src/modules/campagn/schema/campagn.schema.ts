import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { CAMPAGN_TYPE } from '../enum';

@ObjectType('Campagn')
@Entity({ name: 'campagns' })
export class Campagn {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => [CAMPAGN_TYPE])
  @Column()
  campagnType: CAMPAGN_TYPE[];

  @Field()
  @Column()
  campagnName: string;

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

  @Field(() => ID)
  @Column({ nullable: true })
  entrepriseId: ObjectId;

  @Field(() => String)
  @Column({ nullable: true })
  compagnyName: string;

  @Field(() => [String])
  @Column()
  categories: string[];
  
  @Field(() => [String])
  @Column()
  subCategories: string[];
}
