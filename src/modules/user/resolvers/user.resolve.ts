import { ObjectId } from 'mongodb';
import { ConnectUserInput, CreateUserInput } from '../dtos/user.DTO';
import { UserSchema } from '../schema/user.schema';
import { UserService } from '../services/user.service';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuardGuard } from 'src/modules/auth/guards/gql-jwt-guard/gql-jwt-guard';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserSchema])
  async getAllUsers(): Promise<UserSchema[]> {
    return this.userService.findAllUser();
  }
  
  @Query(() => UserSchema)
  async getUserById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UserSchema> {
    const user = this.userService.findById(id);
    return user;
  }

  @Query(() => UserSchema)
  async getUserByEmail(
    @Args('email', { type: () => String }) id: string,
  ): Promise<UserSchema> {
    return this.userService.getUserByEmail(id);
  }
  @Query(() => UserSchema)
  async getCurrentUser(
    @Args('sessionToken', { type: () => String }) id: string,
  ): Promise<UserSchema> {
    return this.userService.currentUser(id);
  }

  // @Mutation(() => UserSchema)
  // async loginUser(@Args('input') input: ConnectUserInput): Promise<UserSchema> {
  //   return await this.userService.loginUser(input);
  // }

  // @Mutation(() => UserSchema)
  // async createUser(@Args('input') input: CreateUserInput): Promise<UserSchema> {
  //   return await this.userService.createUser(input);
  // }
}
