import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { UserResolver } from 'src/modules/auth/resolvers/user.resolve';
import { UserSchema } from 'src/modules/auth/schema/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserById {
  constructor(private readonly resolvers: UserResolver) {}

  async execute(userId: string) {
    return this.resolvers.getUserById(userId);
  }
}