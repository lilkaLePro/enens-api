import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthPayload, ConnectUserInput, CreateUserInput } from "../user/dtos/user.DTO";
import { UserSchema } from "../user/schema/user.schema";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService){}

  @Mutation(() => UserSchema)
  signUp(@Args('input') input: CreateUserInput){
    return this.authService.registerUser(input);
  }
  
  @Mutation(() => AuthPayload)
  async login(@Args('input') input: ConnectUserInput){
    const user = await this.authService.validateUser(input);
    return await this.authService.login(user);
  }

  @Query(() => UserSchema)
  async currentUser(@Context('req') req): Promise<UserSchema> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    return this.authService.getCurrentUserFromToken(token);
  }

}