import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectResolver } from "./resolvers/campagn.resolvers";
import { ProjectServices } from "./services/campagn.services";
import { Campagn } from "./schema/campagn.schema";
import { S3Service } from "../aws/s3.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Campagn]),
  ],
  providers: [ProjectResolver, ProjectServices, S3Service]
})

export class CampagnModules {};