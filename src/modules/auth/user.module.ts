import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./services/user.service";
import { UserResolver } from "./resolvers/user.resolve";
import { UserSchema } from "./schema/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: "3d"}
      })
    })
  ],
  providers: [UserService, UserResolver],
  exports: [JwtModule]
})

export class UserModule {};