import { CreateUserInput } from "../dtos/user.DTO";
import { UserSchema } from "../schema/user.schema";
import { UserService } from "../services/user.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(() => UserSchema)
export class UserResolver {
  constructor (
    private readonly userService: UserService
  ){}

  @Query(() => [UserSchema])
  async users() {
    return this.userService.findAllUser();
  };
  
  @Mutation(() => UserSchema)
  async createUser(
    @Args("input") input: CreateUserInput
  ) : Promise<UserSchema> {
    return await this.userService.createUser(input)
  };
}