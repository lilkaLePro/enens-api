import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectSchema } from '../schema/project.schema';
import { ProjectServices } from '../services/project.services';
import { CreateProjectInput } from '../dtos/project.dtos';

@Resolver(() => [ProjectSchema])
export class ProjectResolver {
  constructor(private readonly projectService: ProjectServices) {}

  @Query(() => [ProjectSchema])
  async getAllProjects(): Promise<ProjectSchema[]> {
    return this.projectService.findAllProjects();
  }
  @Query(() => [ProjectSchema])
  async getUserProjects(
    @Args('authorId', { type: () => String }) authorId: string,
  ): Promise<ProjectSchema[]> {
    return this.projectService.findUserProjects(authorId);
  }
  @Mutation(() => ProjectSchema)
  async createNewProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<ProjectSchema> {
    return await this.projectService.createNewProject(input);
  }
}
