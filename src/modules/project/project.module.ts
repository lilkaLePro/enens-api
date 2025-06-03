import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectResolver } from "./resolvers/project.resolvers";
import { ProjectServices } from "./services/project.services";
import { ProjectSchema } from "./schema/project.schema";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectSchema]),
  ],
  providers: [ProjectResolver, ProjectServices]
})

export class ProjectModules {};