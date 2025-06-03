import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModules } from "../project/project.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { ProjectResolver } from "../project/resolvers/project.resolvers";
import { ProjectServices } from "../project/services/project.services";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectModules]),
  ],
  providers: []
})

export class EntrepriseModule {};
