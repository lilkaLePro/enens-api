import { Args, extend, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Campagn } from '../schema/campagn.schema';
import { ProjectServices } from '../services/campagn.services';
import { CreateCampagnInput } from '../dtos/campagn.dtos';
import { S3Service } from 'src/modules/aws/s3.service';

// import { UseGuards } from '@nestjs/common';

@Resolver(() => [Campagn])
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectServices,
    private readonly serviceS3: S3Service,
  ) {}

  @Query(() => [Campagn])
  async getAllCampagns(): Promise<Campagn[]> {
    return this.projectService.findAllCampagns();
  }

  @Query(() => [Campagn])
  async getUserCampagns(
    @Args('authorId', { type: () => String }) authorId: string,
  ): Promise<Campagn[]> {
    return this.projectService.findUserCampagns(authorId);
  }

  @Mutation(() => Campagn)
  async createNewCampagn(
    @Args('input') input: CreateCampagnInput,
  ): Promise<Campagn> {
    return await this.projectService.createNewCampagn(input);
  }
}
