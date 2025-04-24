import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntrepriseSchema } from "../schema/entreprise.schema";
import { Repository } from "typeorm";

@Injectable()
export class EntrepriseService {
  constructor(
    @InjectRepository(EntrepriseSchema)
    private readonly entrepriseRepository: Repository<EntrepriseSchema>,
  ) {}

  async findAllEntreprise(): Promise<EntrepriseSchema[]> {
    const users = await this.entrepriseRepository.find();
    return users;
  }
}