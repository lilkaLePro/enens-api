import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "./schema/user.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
  ],
  exports: [JwtModule]
})

export class UserModule {};