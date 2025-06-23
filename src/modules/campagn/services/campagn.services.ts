import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campagn } from '../schema/campagn.schema';
import { ObjectId } from 'mongodb';
import { CreateCampagnInput } from '../dtos/campagn.dtos';
import { CAMPAGN_TYPE } from '../enum';

@Injectable()
export class ProjectServices {
  constructor(
    @InjectRepository(Campagn)
    private readonly projectRepository: Repository<Campagn>,
  ) {}

  async findAllCampagns(): Promise<Campagn[]> {
    const projects = await this.projectRepository.find();
    return projects;
  }
  async findUserCampagns(authorId: string): Promise<Campagn[]> {
    const projects = await this.projectRepository.findBy({
      authorId: new ObjectId(authorId),
    });
    return projects;
  }

  async createNewCampagn(
    input: CreateCampagnInput,
    uploadedUrl?: string,
  ): Promise<Campagn> {

    const newCampagn = this.projectRepository.create({
      authorId: new ObjectId(input.authorId),
      thumbnailUrl: uploadedUrl,
      ...input
    });
    await this.projectRepository.save(newCampagn);

    return newCampagn;
  }
}
