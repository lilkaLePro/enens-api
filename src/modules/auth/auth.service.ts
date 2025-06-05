import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { Repository } from 'typeorm';
import { AuthJWTPayload, AuthPayload, ConnectUserInput, CreateUserInput, Role } from '../user/dtos/user.DTO';
import { UserSchema } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema) private userRepo: Repository<UserSchema>,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(input: CreateUserInput) {
    const hashedPassword = await hash(input.password);
    const newUser = this.userRepo.create({
      ...input,
      password: hashedPassword,
      role: Role.USER
    });

    return await this.userRepo.save(newUser);
  }

  async validateLocalUser ({email, password}: ConnectUserInput) {
    const user = this.userRepo.findOneByOrFail({email});
    const passwordMatch = await verify((await user).password, password)

    if(!passwordMatch) {
      throw new UnauthorizedException('Invalid creadentials')
    }
    return user;
  }

  async generateToken(userId: string) {
    const payload: AuthJWTPayload = {
      sub: {
        userId: userId,
      }
    }
    const accessToken = await this.jwtService.signAsync(payload)
    return { accessToken };
  }

  async login (user: UserSchema): Promise<AuthPayload> {
    const { accessToken } = await this.generateToken(user._id.toString())
    if (!user._id) {
      throw new Error("User ID is missing");
    }

    return {
      userId: user._id.toString(),
      role: user.role,
      accessToken,
    }
  }
}
