import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./services/user.service";
import { UserResolver } from "./resolvers/user.resolve";
import { UserSchema } from "./schema/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./guards/constatnt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [JwtModule]
})

export class UserModule {};