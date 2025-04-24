import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectSchema } from "../schema/project.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class ProjectServices {
  constructor(
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>
  ) {}

  async findAllProjects(): Promise<ProjectSchema[]> {
    const projects = await this.projectRepository.find();
    return projects;
  }
  async findUserProjects(authorId: string): Promise<ProjectSchema[]> {
    // if(authorId.length < 12) {
    //   throw new Error("this table is empty")
    // }
    const projects = await this.projectRepository.findBy({ authorId: new ObjectId(authorId) })
    return projects
  }

  // async findAllUsersProjects(userId: string): Promise<ProjectSchema> {
  //   const projects = await this.projectRepository.findBy({ id: new ObjectId(userId) })
    
  //   return projects;
  // }

  // async addProject(input: createProjectInput): Promise<ProjectSchema> {
  //   return
  // }
}