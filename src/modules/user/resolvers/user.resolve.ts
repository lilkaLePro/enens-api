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
  }
  
  @Mutation(() => UserSchema)
  async createUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('password') password: string,

  ) {
    return this.userService.createUser({email, firstName, lastName, password})
  }
}