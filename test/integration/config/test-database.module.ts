import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresContainer } from './postgres-container';
import { RegisterEntity } from '../../../src/context/documents/infrastructure/entities/register/Register.entity';
import { CertificateEntity } from '../../../src/context/documents/infrastructure/entities/certificate/Certificate.entity';

@Module({})
export class TestDatabaseModule {
  static async forTest(): Promise<DynamicModule> {
    const dbConfig = await PostgresContainer.start();

    return {
      module: TestDatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [RegisterEntity, CertificateEntity],
          synchronize: true,
        }),
      ],
      providers: [
        {
          provide: 'POSTGRES_CONTAINER',
          useValue: PostgresContainer,
        },
      ],
      exports: ['POSTGRES_CONTAINER'],
    };
  }
}
