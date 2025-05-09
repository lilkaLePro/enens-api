import { ObjectId } from 'typeorm';
import { ConnectUserInput, CreateUserInput } from '../dtos/user.DTO';
import { UserSchema } from '../schema/user.schema';
import { UserService } from '../services/user.service';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserSchema])
  async getAllUsers() {
    return this.userService.findAllUser();
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

  @Mutation(() => UserSchema)
  async loginUser(@Args('input') input: ConnectUserInput): Promise<UserSchema> {
    return await this.userService.loginUser(input);
  }

  @Mutation(() => UserSchema)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserSchema> {
    return await this.userService.createUser(input);
  }
}
