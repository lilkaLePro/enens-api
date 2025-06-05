import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectSchema } from '../schema/project.schema';
import { ProjectServices } from '../services/project.services';
import { CreateProjectInput } from '../dtos/project.dtos';
import { GqlJwtGuardGuard } from 'src/modules/auth/guards/gql-jwt-guard/gql-jwt-guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => [ProjectSchema])
export class ProjectResolver {
  constructor(private readonly projectService: ProjectServices) {}
  
  @UseGuards(GqlJwtGuardGuard)
  @Query(() => [ProjectSchema])
  async getAllProjects(): Promise<ProjectSchema[]> {
    return this.projectService.findAllProjects();
  }
  
  @UseGuards(GqlJwtGuardGuard)
  @Query(() => [ProjectSchema])
  async getUserProjects(
    @Args('authorId', { type: () => String }) authorId: string,
  ): Promise<ProjectSchema[]> {
    return this.projectService.findUserProjects(authorId);
  }
  
  @UseGuards(GqlJwtGuardGuard)
  @Mutation(() => ProjectSchema)
  async createNewProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<ProjectSchema> {
    return await this.projectService.createNewProject(input);
  }
}
