import { Injectable } from '@nestjs/common';
import { UserResolver } from 'src/modules/user/resolvers/user.resolve';

@Injectable()
export class GetUserById {
  constructor(private readonly resolvers: UserResolver) {}

  async execute(userId: string) {
    return this.resolvers.getUserById(userId);
  }
}