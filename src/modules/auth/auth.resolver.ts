import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthPayload, ConnectUserInput, CreateUserInput } from "../user/dtos/user.DTO";
import { AuthService } from "./auth.service";
import { UserSchema } from "../user/schema/user.schema";
import { UseGuards } from "@nestjs/common";
import { GqlJwtGuardGuard } from "./guards/gql-jwt-guard/gql-jwt-guard";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService){}

  @Mutation(() => UserSchema)
  signUp(@Args('input') input: CreateUserInput){
    return this.authService.registerUser(input);
  }
  
  @Mutation(() => AuthPayload)
  async signIn(@Args('input') input: ConnectUserInput){
    const user = await this.authService.validateLocalUser(input);
    return await this.authService.login(user);
  }

}