import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectSchema } from '../schema/project.schema';
import { ObjectId } from 'mongodb';
import { CreateProjectInput } from '../dtos/project.dtos';

@Injectable()
export class ProjectServices {
  constructor(
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>,
  ) {}

  async findAllProjects(): Promise<ProjectSchema[]> {
    const projects = await this.projectRepository.find();
    return projects;
  }
  async findUserProjects(authorId: string): Promise<ProjectSchema[]> {
    const projects = await this.projectRepository.findBy({
      authorId: new ObjectId(authorId),
    });
    return projects;
  }

  async createNewProject(input: CreateProjectInput): Promise<ProjectSchema> {
    const { projectName, description, projectType, authorId } = input;
    
    const project = this.projectRepository.create({
      projectType: projectType,
      ProjectName: projectName,
      description: description,
      authorId: new ObjectId(authorId),
    });
    const newProject = await this.projectRepository.save(project)

    return newProject;
  }
}
