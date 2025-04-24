import { Query, Resolver } from '@nestjs/graphql';
import { EntrepriseSchema } from '../schema/entreprise.schema';
import { EntrepriseService } from '../services/entreprise.services';

@Resolver(() => [EntrepriseSchema])
export class EntrepriseResolver {
  constructor(private readonly entrepriseService: EntrepriseService) {}

  @Query(() => [EntrepriseSchema])
  async getAllEntreprise(): Promise<EntrepriseSchema[]> {
  return this.entrepriseService.findAllEntreprise()
  }
  @Query(() => [EntrepriseSchema])
  async getEntrepriseById() {
    return
  }
}
