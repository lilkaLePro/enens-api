import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectSchema } from '../schema/project.schema';
import { ProjectServices } from '../services/project.services';

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
}
