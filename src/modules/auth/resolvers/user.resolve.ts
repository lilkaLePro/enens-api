import { ObjectId } from "typeorm";
import { ConnectUserInput, CreateUserInput } from "../dtos/user.DTO";
import { UserSchema } from "../schema/user.schema";
import { UserService } from "../services/user.service";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(() => UserSchema)
export class UserResolver {
  constructor (
    private readonly userService: UserService
  ){}

  @Query(() => [UserSchema])
  async getAllUsers() {
    return this.userService.findAllUser();
  };
  
  @Query(() => UserSchema)
  async getOneUser(@Args('id', {type: () => ID}) id: ObjectId): Promise<UserSchema> {
    return this.userService.findUserById(id)
  }

  @Mutation(() => UserSchema)
  async loginUser(
    @Args("input") input: ConnectUserInput
  ) : Promise<UserSchema> {
    return await this.userService.loginUser(input)
  }
  
  @Mutation(() => UserSchema)
  async createUser(
    @Args("input") input: CreateUserInput
  ) : Promise<UserSchema> {
    return await this.userService.createUser(input)
  };
}