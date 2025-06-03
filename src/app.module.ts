import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormConfig';
import { UserModule } from './modules/auth/user.module';
import { ProjectModules } from './modules/project/project.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      // include: [] //ici pour les autres endpoints comme UserModules
    }),
    TypeOrmModule.forRoot(ormConfig()),
    UserModule, ProjectModules
  ],
  providers: [AppService, AppController],
  
})
export class AppModule {}