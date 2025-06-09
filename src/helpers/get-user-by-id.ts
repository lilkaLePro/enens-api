import { Injectable } from '@nestjs/common';
import { AuthResolver } from 'src/modules/auth/auth.resolver';

@Injectable()
export class GetUserById {
  constructor(private readonly resolvers: AuthResolver) {}

  async execute(userId: string) {
    return this.resolvers.getUserById(userId);
  }
}