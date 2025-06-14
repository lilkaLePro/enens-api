import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { Role } from '../dtos/user.DTO';


@ObjectType()
export class Address {
  @Field({ nullable: true })
  @Column({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;
}

@Entity({name: 'users'})
@ObjectType('User')
export class UserSchema {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectId;

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
  password?: string;

  @Field(() => Role)
  @Column({default: Role.USER})
  role?: Role

  @Field()
  @Column()
  accessToken: string;
}

@Entity({name: 'profiles'})
@ObjectType('Profile')
export class Profile {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => ID)
  @Column({ type: String})
  userId: ObjectId;
  
  @Field()
  @Column({nullable: true})
  biographie?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  function?: string

  @Field()
  @Column({nullable: true})
  profileUrl?: string

  @Field(() => Address, { nullable: true })
  @Column(() => Address)
  Adress?: Address
}