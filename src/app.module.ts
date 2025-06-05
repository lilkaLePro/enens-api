import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormConfig';
import { ProjectModules } from './modules/project/project.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JWTStrategy } from './modules/auth/strategies/jwt.strategie';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [ormConfig],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    AuthModule, ProjectModules
  ],
  providers: [AppService, AppController, JWTStrategy],
  
})
export class AppModule {}